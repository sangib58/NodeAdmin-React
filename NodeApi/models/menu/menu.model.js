const sql=require('../../configs/db-connection')

//constructor
const Menu=function(menu){
    if(typeof menu.menuID!='undefined'){
        this.menuID=menu.menuID
    }
    this.parentID=menu.parentID
    this.menuTitle=menu.menuTitle
    this.url=menu.url
    this.isSubMenu=menu.isSubMenu
    this.sortOrder=menu.sortOrder
    this.iconClass=menu.iconClass  
    this.isActive=menu.isActive
    this.dateAdded=menu.dateAdded
    this.addedBy=menu.addedBy
    this.isMigrationData=menu.isMigrationData
    this.lastUpdatedDate=menu.lastUpdatedDate
    this.lastUpdatedBy=menu.lastUpdatedBy
}

//side bar menu
Menu.sidebar=async(roleId)=>{
    const userRole= await sql.query('select * FROM userrole where UserRoleId=?',roleId)
    const menuGroupId=userRole[0].menuGroupId
    const parentMenus= await sql.query('select MenuID,ParentID,MenuTitle,URL,SortOrder,IconClass,IsActive FROM menu where ParentID=0 order by SortOrder')
    const sidebar=[]  
    await Promise.all(parentMenus.map(async (element)=>{
        const childMenus=await sql.query('select MenuID as id,MenuTitle as title,URL as route from menu m where parentID=? and menuID=(select menuId from menugroupwisemenumapping where menuId=m.menuID and menuGroupId=?)',[element.MenuID,menuGroupId])
        if(childMenus.length>0){
            await sidebar.push({id:element.MenuID,title:element.MenuTitle,icon:element.IconClass,
            route:element.URL,order:element.SortOrder,isActive:element.IsActive,childItems:childMenus})
        }else{
            const checkMenu=await sql.query('select * from menugroupwisemenumapping where menuGroupId=? and menuId=?',[menuGroupId,element.MenuID])
            if(checkMenu.length>0){
                await sidebar.push({id:element.MenuID,title:element.MenuTitle,icon:element.IconClass,
                route:element.URL,order:element.SortOrder,isActive:element.IsActive,childItems:[]})
            }
        }       
    }))
    return sidebar.sort((a,b)=>a.order-b.order)
}

//all menu for mapping
Menu.allMenu=async(menuGroupId)=>{
    const parentMenus= await sql.query('select MenuID,ParentID,MenuTitle,URL,SortOrder,IconClass,IsActive FROM menu where ParentID=0 order by SortOrder')
    const sidebar=[]  
    await Promise.all(parentMenus.map(async (element)=>{
        const childMenus=await sql.query('select MenuID as id,MenuTitle as title,if(m.menuid=(select menuid from menugroupwisemenumapping where menugroupid=? and menuid=m.menuid),true,false) isSelected from menu m where parentID=?',[menuGroupId,element.MenuID])
        if(childMenus.length>0){
            await sidebar.push({id:element.MenuID,title:element.MenuTitle,order:element.SortOrder,isParentSelected:true,
            children:childMenus})
        }else{
            const checkMenu=await sql.query('select * from menugroupwisemenumapping where menuGroupId=? and menuId=?',[menuGroupId,element.MenuID])
            await sidebar.push({id:element.MenuID,title:element.MenuTitle,order:element.SortOrder,isParentSelected:(checkMenu.length>0?true:false),children:[]})
        }       
    }))
    return sidebar.sort((a,b)=>a.order-b.order)
}
//create menu
Menu.create=async(objMenu)=>{
    const {menuTitle,sortOrder}=objMenu
    const row=await sql.query('select * from menu where upper(menuTitle)=upper(?) or (sortOrder=? and parentID=0 and sortOrder>0) or (parentID=0 and sortOrder<=0)',[menuTitle,sortOrder])
    if(row.length==0){
        await sql.query('insert into menu set ?',objMenu)
        return 'success'
    }else if(row.length>0 && row[0].menuTitle.toUpperCase()==objMenu.menuTitle.toUpperCase()){
        return 'titleDuplicate'
    }else if(row.length>0 && row[0].sortOrder==objMenu.sortOrder){
        return 'orderDuplicate'
    }else if(row.length>0 && objMenu.sortOrder<=0){
        return 'lowerOrder'
    }else{
        return
    }
}

//update menu
Menu.update=async(menu)=>{
    const {menuID,parentID,menuTitle,url,isSubMenu,sortOrder,iconClass,lastUpdatedDate,lastUpdatedBy}=menu
    const chkTitle=await sql.query('select * from menu where menuID!=? and upper(menuTitle)=upper(?)',[menuID,menuTitle])
    const chkOrder=await sql.query('select * from menu where menuID!=? and sortOrder=? and parentID=0 and sortOrder>0',[menuID,sortOrder])
    if(chkTitle.length>0){
        return 'titleDuplicate'
    }else if(menu.parentID==0 && menu.sortOrder<=0){
        return 'lowerOrder' 
    }else if(chkOrder.length>0){
        return 'orderDuplicate'
    }else{
        await sql.query('update menu set parentID=?,menuTitle=?,url=?,isSubMenu=?,sortOrder=?,iconClass=?,lastUpdatedDate=?,lastUpdatedBy=? where menuID=?',[parentID,menuTitle,url,isSubMenu,sortOrder,iconClass,lastUpdatedDate,lastUpdatedBy,menuID])
        return 'success'
    }
}

//menu list
Menu.list=async()=>{
    const rows=await sql.query('select m.menuID,m.menuTitle,m.url,m.isSubMenu,m.sortOrder,m.iconClass,m.parentID,(select menuTitle from menu where menuID=m.parentID) parentMenuName FROM menu m order by m.parentid')
    return rows
}

//find menu by id
Menu.findBy=async(id)=>{
    const row=await sql.query('select * from menu where menuID=?',id)
    if(row.length==1){
        return row[0]
    }
}

//delete menu by id
Menu.deleteBy=async(id)=>{
    await sql.query('delete from menu where menuID=?',id)
}

//parent menus
Menu.parent=async()=>{
    const rows=await sql.query('select menuID as id,menuTitle as text from menu where parentID=0 and isSubMenu=1')
    return rows
}

module.exports=Menu
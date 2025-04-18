const sql=require('../../configs/db-connection')

//constructor
const MenuMapping=function(menu){
    if(typeof menu.menuGroupWiseMenuMappingId!='undefined'){
        this.menuGroupWiseMenuMappingId=menu.menuGroupWiseMenuMappingId
    }
    this.menuGroupId=menu.menuGroupId  
    this.menuId=menu.menuId  
    this.isSelected=menu.isSelected
    this.isActive=menu.isActive
    this.dateAdded=menu.dateAdded
    this.addedBy=menu.addedBy
    this.isMigrationData=menu.isMigrationData
}

//assign new menu to mapping
MenuMapping.assign=async(objMenu)=>{
    const {menuId,menuGroupId,isActive,isMigrationData,dateAdded,addedBy,isSelected}=objMenu
    const objCheck=await sql.query('select * FROM menugroupwisemenumapping where menuGroupId=? and menuId=?',[menuGroupId,menuId])
    if(isSelected==true){
        if(objCheck.length==0){
            await sql.query('insert into menugroupwisemenumapping set menuGroupId=?,menuId=?,isActive=?,isMigrationData=?,dateAdded=?,addedBy=?',[menuGroupId,menuId,isActive,isMigrationData,dateAdded,addedBy])
            return objCheck.length
        }
    }else if(isSelected==false){
        if(objCheck.length>0){
            await sql.query('delete from menugroupwisemenumapping where MenuGroupWiseMenuMappingId=?',[objCheck[0].menuGroupWiseMenuMappingId])
            return objCheck.length
        }
    }
    return
}

//menu mapping list
MenuMapping.list=async()=>{
    const rows=await sql.query('select * FROM menugroupwisemenumapping')
    return rows
}

module.exports=MenuMapping
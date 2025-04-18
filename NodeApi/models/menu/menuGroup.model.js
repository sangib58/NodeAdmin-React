const sql=require('../../configs/db-connection')

//constructor
const MenuGroup=function(menu){
    if(typeof menu.menuGroupID!='undefined'){
        this.menuGroupID=menu.menuGroupID
    }
    this.menuGroupName=menu.menuGroupName  
    this.isActive=menu.isActive
    this.dateAdded=menu.dateAdded
    this.addedBy=menu.addedBy
    this.isMigrationData=menu.isMigrationData
    this.lastUpdatedDate=menu.lastUpdatedDate
    this.lastUpdatedBy=menu.lastUpdatedBy
}

//menu group list
MenuGroup.list=async()=>{
    const rows=await sql.query('SELECT menuGroupId,menuGroupName FROM menugroup')
    return rows
}

//find menu group by id
MenuGroup.findBy=async(id)=>{
    const row=await sql.query('select * from menugroup where menuGroupID=?',id)
    if(row.length==1){
        return row[0]
    }
}

//delete menu group by id
MenuGroup.deleteBy=async(id)=>{
    const row=await sql.query('select * from userrole where menuGroupId=?',id)
    if(row.length==0){
        await sql.query('delete from menugroup where menuGroupId=?',id)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//create menuGroup
MenuGroup.create=async(menuGroup)=>{
    const row=await sql.query('select * from menugroup where menuGroupName=?',menuGroup.menuGroupName)
    if(row.length==0){
        await sql.query('insert into menugroup set ?',menuGroup)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}
//update menuGroup
MenuGroup.update=async(menuGroup)=>{
    const {menuGroupID,menuGroupName,lastUpdatedDate,lastUpdatedBy}=menuGroup
    const row=await sql.query('select * from menugroup where menuGroupID!=? and upper(menuGroupName)=upper(?)',[menuGroupID,menuGroupName])
    if(row.length==0){
        await sql.query('update menugroup set menuGroupName=?, lastUpdatedDate=?,lastUpdatedBy=? where menuGroupID=?',[menuGroupName,lastUpdatedDate,lastUpdatedBy,menuGroupID])
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

module.exports=MenuGroup


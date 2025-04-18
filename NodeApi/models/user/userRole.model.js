const sql=require('../../configs/db-connection')

//constructor
const UserRole=function(objRole){
    if(typeof objRole.userRoleId!='undefined'){
        this.userRoleId=objRole.userRoleId
    }
    this.roleName=objRole.roleName
    this.roleDesc=objRole.roleDesc
    this.menuGroupId=objRole.menuGroupId
    this.isActive=objRole.isActive
    this.isMigrationData=objRole.isMigrationData
    this.addedBy=objRole.addedBy
    this.dateAdded=objRole.dateAdded
    this.lastUpdatedDate=objRole.lastUpdatedDate
    this.lastUpdatedBy=objRole.lastUpdatedBy
}

//create new role
UserRole.create=async(newRole)=>{
    const row=await sql.query('select * from userrole where roleName=?',newRole.roleName)
    if(row.length==0){
        await sql.query('insert into userrole set ?',newRole)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//update role
UserRole.update=async(objRole)=>{
    const {userRoleId,roleName,roleDesc,menuGroupId,lastUpdatedDate,lastUpdatedBy}=objRole
    const row=await sql.query('select * from userrole where userRoleId!=? and upper(roleName)=upper(?)',[userRoleId,roleName])
    if(row.length==0){
        await sql.query('update userrole set roleName=?, roleDesc=?, menuGroupId=?, lastUpdatedDate=?,lastUpdatedBy=? where userRoleId=?',[roleName,roleDesc,menuGroupId,lastUpdatedDate,lastUpdatedBy,userRoleId])
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//get all role
UserRole.allRole=async()=>{
    const rows=await sql.query('select r.roleName,r.roleDesc,m.menuGroupName,m.menuGroupId,r.userRoleId from userrole r, menugroup m where r.menugroupid=m.menugroupid')
    if(rows.length>0){
        return rows
    }else{
        return []
    }
}

//find user by user id
UserRole.findBy=async(id)=>{
    const row=await sql.query('select * from userrole where userRoleId=?',id)
    if(row.length==1){
        return row[0]
    }
}

//delete user by user id
UserRole.deleteBy=async(id)=>{
    const row=await sql.query('select * from users where userRoleId=?',id)
    if(row.length==0){
        await sql.query('delete from userrole where userRoleId=?',id)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

module.exports=UserRole
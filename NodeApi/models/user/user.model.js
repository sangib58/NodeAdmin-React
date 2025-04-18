const sql=require('../../configs/db-connection')
const {uuidv4}=require('../../helpers/guid-generator')

//constructor
const User=function(user){
    //console.log('user',user)
    if(typeof user.userId!='undefined'){
        this.userId=user.userId
    }
    this.userRoleId=user.userRoleId
    this.password=user.password
    this.fullName=user.fullName
    this.email=user.email
    this.mobile=user.mobile
    this.dateOfBirth=user.dateOfBirth
    this.imagePath=user.imagePath
    this.isActive=user.isActive
    this.isMigrationData=user.isMigrationData
    this.addedBy=user.addedBy
    this.dateAdded=user.dateAdded
    this.lastPasswordChangeDate=user.lastPasswordChangeDate
    this.passwordChangedBy=user.passwordChangedBy
    this.isPasswordChange=user.isPasswordChange
    this.lastUpdatedDate=user.lastUpdatedDate
    this.lastUpdatedBy=user.lastUpdatedBy
}

//login
User.login=async(email)=>{
    const row=await sql.query('select u.userId,u.userRoleId,r.roleName,u.fullName,u.email,u.mobile,u.imagePath,u.dateOfBirth,u.lastUpdatedBy,u.password from users u,userrole r where u.userRoleId=r.userRoleId and u.email=?',email)
    //console.log('row',row)
    if(row.length==1){
        let user=row[0]
        return user
    }
}

//create new user
User.create=async(newUser)=>{
    const row=await sql.query('select * from users where email=?',newUser.email)
    if(row.length==0){
        await sql.query('insert into users set ?',newUser)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//update user
User.update=async(objUser)=>{
    const {userId,userRoleId,fullName,email,mobile,dateOfBirth,imagePath,lastUpdatedDate,lastUpdatedBy}=objUser
    await sql.query('update users set userRoleId=?, fullName=?, email=?, mobile=?, dateOfBirth=?,imagePath=?, lastUpdatedDate=?,lastUpdatedBy=? where userId=?',[userRoleId,fullName,email,mobile,dateOfBirth,imagePath,lastUpdatedDate,lastUpdatedBy,userId])
    return
}

//get all user
User.allUser=async()=>{
    const rows=await sql.query('select u.userId,u.userRoleId,r.roleName,u.fullName,u.email,u.mobile,u.imagePath,u.dateOfBirth,u.lastUpdatedBy,u.password from users u,userrole r where u.userRoleId=r.userRoleId')
    if(rows.length>0){
        let users=rows
        return users
    }else{
        return []
    }
}

//find user by user id
User.findBy=async(id)=>{
    const row=await sql.query('select * from users where userId=?',id)
    if(row.length==1){
        let user=row[0]
        //delete user.password
        return user
    }
}

//find user by hash
User.findByHash=async(hash)=>{
    const row=await sql.query('select userId,email,fullName from users where forgetPasswordRef=?',hash)
    if(row.length==1){
        let user=row[0]
        return user
    }
}

//delete user by user id
User.deleteBy=async(id)=>{
    await sql.query('delete from users where userId=?',id)
}

//get user info by email
User.getUserInfoByEmail=async(email)=>{
    const passwordRef=uuidv4()
    await sql.query('update users set forgetPasswordRef=? where email=?',[passwordRef,email])
    const row=await sql.query('select * from users where email=?',email)
    if(row.length==1){
        return row[0]
    }
}

//user registration
User.registration=async(newUser)=>{
    const row=await sql.query('select * from users where email=?',newUser.email)
    if(row.length==0){
        await sql.query('insert into users set ?',newUser)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//update profile
User.updateProfile=async(objUser)=>{
    const {userId,fullName,email,mobile,dateOfBirth,imagePath,lastUpdatedDate,lastUpdatedBy}=objUser
    await sql.query('update users set fullName=?, email=?, mobile=?, dateOfBirth=?,imagePath=?, lastUpdatedDate=?,lastUpdatedBy=? where userId=?',[fullName,email,mobile,dateOfBirth,imagePath,lastUpdatedDate,lastUpdatedBy,userId])
    return
}

//change password
User.changePassword=async(objUser)=>{
    const {userId,password,lastPasswordChangeDate,passwordChangedBy,isPasswordChange}=objUser
    await sql.query('update users set password=?, lastPasswordChangeDate=?, passwordChangedBy=?, isPasswordChange=? where userId=?',[password,lastPasswordChangeDate,passwordChangedBy,isPasswordChange,userId])
    return
}

//user status
User.status=async()=>{
    const rows=await sql.query('select * from users')
    return rows 
}

module.exports=User
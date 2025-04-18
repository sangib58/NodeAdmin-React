const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const User=require('../models/user/user.model')
const UserRole=require('../models/user/userRole.model')
const LogHistory=require('../models/user/logHistory.model')
const {Confirmation}=require('../helpers/confirmation')


//login
const login=async(req,res)=>{
    try {
        const user=await User.login(req.body.email)
        if(user){
            const validatePassword=await bcrypt.compare(req.body.password,user.password)
            if(!validatePassword){
                res.status(202).send(new Confirmation('error','Incorrect Password'))
            }else{
                const token=jwt.sign({userId:user.userId,userRoleId:user.userRoleId,fullName:user.fullName},process.env.TOKEN_SECRET,{expiresIn: '240m'})
                //res.header('auth-token',token).send({'token':token})
                res.status(200).send({token:token,obj:user})
            }
        }else{
            res.status(202).send(new Confirmation('error','Incorrect Email'))
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error)) 
    }
}

//user registration
const userRegistration=async(req,res)=>{
    try {
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(req.body.password,salt)
        //create a user object
        const user=new User({
            userRoleId:2,
            password:hashPassword,
            fullName:req.body.fullName,
            email:req.body.email,
            mobile:req.body.mobile || '',
            dateOfBirth:req.body.dateOfBirth || null,
            imagePath:req.body.imagePath || '',
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy || 1,
            dateAdded:new Date(),
            lastPasswordChangeDate:req.body.lastPasswordChangeDate,
            passwordChangedBy:req.body.passwordChangedBy,
            isPasswordChange: 0,
            lastUpdatedDate:req.body.lastUpdatedDate,
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        
        const checkLength=await User.registration(user)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This email already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get date wise login data
const getDateWiseLogin=async(req,res)=>{
    try {
        const {id}=req.params
        const list= await LogHistory.dateLogin(id)
        return res.status(200).send(list)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get month wise login data
const getMonthWiseLogin=async(req,res)=>{
    try {
        const {id}=req.params
        const list= await LogHistory.monthLogin(id)
        return res.status(200).send(list)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get month wise login data
const getYearWiseLogin=async(req,res)=>{
    try {
        const {id}=req.params
        const list= await LogHistory.yearLogin(id)
        return res.status(200).send(list)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get browser wise login data
const getBrowserWiseLogin=async(req,res)=>{
    try {
        const {id}=req.params
        const list= await LogHistory.browserLogin(id)
        return res.status(200).send(list)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get user role wise login data
const getRoleWiseLogin=async(req,res)=>{
    try {
        const list= await LogHistory.roleLogin()
        return res.status(200).send(list)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//create new user
const createNewUser=async(req,res)=>{
    try {
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(req.body.password,salt)
        //create a user object
        const user=new User({
            userRoleId:req.body.userRoleId,
            password:hashPassword,
            fullName:req.body.fullName,
            email:req.body.email,
            mobile:req.body.mobile,
            dateOfBirth:req.body.dateOfBirth || null,
            imagePath:req.body.imagePath || '',
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy,
            dateAdded:new Date(),
            lastPasswordChangeDate:req.body.lastPasswordChangeDate,
            passwordChangedBy:req.body.passwordChangedBy,
            isPasswordChange: 0,
            lastUpdatedDate:req.body.lastUpdatedDate,
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        
        //save to db       
        const checkLength=await User.create(user)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This email already exists! Please try another email.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//update user
const updateUser=async(req,res)=>{
    try {       
        const user=new User({
            userId:req.body.userId,
            userRoleId:req.body.userRoleId,
            fullName:req.body.fullName,
            email:req.body.email,
            mobile:req.body.mobile,
            dateOfBirth:req.body.dateOfBirth || null,
            imagePath:req.body.imagePath || '',
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
       await User.update(user)
       res.status(200).send(new Confirmation('success','Successfully saved'))           
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//fetch all user
const allUser=async(req,res)=>{
    try {
        const roles=await User.allUser()
        res.status(200).send(roles)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//fetch single user
const findUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findBy(id)
        if(user){
            res.status(200).send(user)
        }else{
            res.status(202).send(new Confirmation('error','User not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//fetch single user by hash
const findUserByHash=async(req,res)=>{
    try {
        const {hash}=req.params
        const user=await User.findByHash(hash)
        if(user){
            res.status(200).send(user)
        }else{
            res.status(202).send(new Confirmation('error','User not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//delete single user
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params
        await User.deleteBy(id)
        res.status(200).send(new Confirmation('success','Deleted successfully!'))
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//create new role
const createNewRole=async(req,res)=>{
    try {
        //create a user object
        const userRole=new UserRole({
            roleName:req.body.roleName,
            roleDesc:req.body.roleDesc,
            menuGroupId:req.body.menuGroupId,
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy,
            dateAdded:new Date(),
            lastUpdatedDate:req.body.lastUpdatedDate,
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        
        const checkLength=await UserRole.create(userRole)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This role already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//update role
const updateRole=async(req,res)=>{
    try {       
        const role=new UserRole({
            userRoleId:req.body.userRoleId,
            roleName:req.body.roleName,
            roleDesc:req.body.roleDesc,
            menuGroupId:req.body.menuGroupId,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
       const checkLength=await UserRole.update(role)
       if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This role already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//fetch all role
const allRole=async(req,res)=>{
    try {
        const roles=await UserRole.allRole()
        res.status(200).send(roles)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//fetch single role
const findRole=async(req,res)=>{
    try {
        const {id}=req.params
        const role=await UserRole.findBy(id)
        if(role){
            res.status(200).send(role)
        }else{
            res.status(202).send(new Confirmation('error','Role not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//delete single role
const deleteRole=async(req,res)=>{
    try {
        const {id}=req.params
        const checkLength=await UserRole.deleteBy(id)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Deleted successfully!'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This user role has assigned user. Not allowed to delete.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//create log history
const createHistory=async(req,res)=>{
    try {       
        const history=new LogHistory({
            logCode:null,
            logDate:new Date(),
            userId:req.body.userId,
            logInTime:new Date(),
            logOutTime:req.body.logOutTime || null,
            ip:req.body.ip,
            browser:req.body.browser,
            browserVersion:req.body.browserVersion,
            platform:req.body.platform
        })
       const obj=await LogHistory.create(history)
       res.status(200).send(obj)           
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//update log history
const updateHistory=async(req,res)=>{
    try {
        const {logCode}=req.params       
        const history=new LogHistory({
            logCode:logCode,
            logOutTime:new Date(),
        })
       await LogHistory.update(history)
       res.status(200).send(new Confirmation('success','Successfully saved'))           
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//get user info
const getUserInfo=async(req,res)=>{
    try {
        const {email}=req.params
        const user=await User.getUserInfoByEmail(email)
        if(user){
            res.status(200).send(user)
        }else{
            res.status(202).send(new Confirmation('error','User not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update profile
const updateProfile=async(req,res)=>{
    try {       
        const user=new User({
            userId:req.body.userId,
            fullName:req.body.fullName,
            email:req.body.email,
            mobile:req.body.mobile,
            dateOfBirth:req.body.dateOfBirth || null,
            imagePath:req.body.imagePath || '',
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
       await User.updateProfile(user)
       res.status(200).send(new Confirmation('success','Successfully saved'))           
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//update profile
const passwordChange=async(req,res)=>{
    try {
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(req.body.password,salt)

        const user=new User({
            userId:req.body.userId,
            password:hashPassword,
            lastPasswordChangeDate:new Date(),
            passwordChangedBy:req.body.passwordChangedBy,
            isPasswordChange:true
        })
       await User.changePassword(user)
       res.status(200).send(new Confirmation('success','Password changed successfully'))           
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//get single status
const getUserStatus=async(req,res)=>{
    try {
        const user=await User.status()       
        const activeUsers=user.filter((item)=>{
            return item.isActive==true
        })
        const inActiveUsers=user.filter((item)=>{
            return item.isActive==false
        })
        const adminUsers=user.filter((item)=>{
            return item.userRoleId==1
        })
        
        if(user){
            res.status(200).send({totalUser:user.length,activeUser:activeUsers.length,inActiveUser:inActiveUsers.length,adminUser:adminUsers.length})
        }else{
            res.status(202).send(new Confirmation('error','User not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get browse data
const getBrowseList=async(req,res)=>{
    try {
        const {id}=req.params
        let list=await LogHistory.browse()
        if(id!=1){
            list=list.filter((item)=>{
                return item.userId==id
            })
        }
        res.status(200).send({data:list,recordsTotal:list.length})
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get notification data
const getNotifications=async(req,res)=>{
    try {
        const {id}=req.params
        const list=await LogHistory.notification(id)
        res.status(200).send({data:list,recordsTotal:list.length})
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//upload file
const uploadFile=(req,res)=>{
    try {    
        // Multer Configuration
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'resources/images');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        });

        const upload = multer({ storage }).single('image');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.status(400).send(new Confirmation('error',err))
            } else if (err) {
              // An unknown error occurred when uploading.
              res.status(400).send(new Confirmation('error',err))
            }       
            // Everything went fine.
            const pathToSend='/images/'+req.file.filename
            res.status(200).send({dbPath:pathToSend})
        })      
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

module.exports={login,userRegistration,getDateWiseLogin,getMonthWiseLogin,getYearWiseLogin,getBrowserWiseLogin,getRoleWiseLogin,
    getUserInfo,createNewUser,updateUser,allUser,findUser,findUserByHash,deleteUser,createNewRole,updateRole,allRole,findRole,deleteRole,
    createHistory,updateHistory,updateProfile,passwordChange,getUserStatus,getBrowseList,getNotifications,uploadFile}
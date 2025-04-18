const jwt=require('jsonwebtoken')
const api_client_users=require('./api-keys').users

const checkAuth=(req,res,next)=>{
    try {
        let token=req.header('Authorization')
        if(!token){
            res.status(401).send('Access denied!')
        }else{
            if(token.startsWith('Bearer ')){
                token=token.slice(7,token.length).trimLeft()
            }
            const verifiedInfo=jwt.verify(token,process.env.TOKEN_SECRET)
            //console.log('verifiedInfo',verifiedInfo)
            req.user=verifiedInfo
            next()
        }
    } catch (error) {
        return res.status(400).send('Invalid token!')
    }
}

const checkAdmin=(req,res,next)=>{
    if(req.user.userRoleId!=1){
        return res.status(401).send('This function not allowed for other than admin role')
    }
    next()
}

const checkUser=(req,res,next)=>{
    if(req.user.userRoleId!=2){
        return res.status(401).send('This function not allowed for other than user role')
    }
    next()
}

const checkAdminOrUser=(req,res,next)=>{
    if(req.user.userRoleId>2){
        return res.status(401).send('This function only allowed for admin/user')
    }
    next()
}

const checkApiKey=(req,res,next)=>{
    try {
        let api_key=req.header('x-api-key')
        if(!api_key){
            res.status(401).send('Access denied!')
        }else{
            let account=api_client_users.find((user)=>user.api_key==api_key)
            if(!account){
                return res.status(400).send('Wrong key')
            }else{
                next()
            }
        }
    } catch (error) {
        return res.status(400).send('Invalid api key!')
    }
}

module.exports={checkAuth,checkAdmin,checkUser,checkAdminOrUser,checkApiKey}
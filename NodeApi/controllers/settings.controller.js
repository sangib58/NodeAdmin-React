const multer=require('multer')
const nodemailer=require('nodemailer')
const Settings=require('../models/others/settings.model')
const Faq=require('../models/others/faq.model')
const Contact=require('../models/others/contact.model')
const ErrorLog=require('../models/others/errorLog.model')
const {Confirmation}=require('../helpers/confirmation')

//welcome email
const welcomeEmail=async(req,res)=>{
    try {
        const objSettings=await Settings.list()
        const transporter=nodemailer.createTransport({
            host:objSettings.host,
            port:objSettings.port,
            secure:objSettings.port==587?false:true,
            auth:{
                user:objSettings.defaultEmail,
                pass:objSettings.password
            }
        })

        const htmlContent=
        `<!doctype html>
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>[subject]</title>
            <meta name="description" content="Welcome Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <a href=${req.body.siteUrl} title="logo" target="_blank">
                                        <img width="60" src=${req.body.logoPath} title="logo" alt="logo">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                    ${objSettings.welcomeEmailHeader}
                                                </h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    ${objSettings.welcomeEmailBody}
                                                </p>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Here is your authorized email(${req.body.toEmail}) and password(${req.body.password})
                                                </p>
                                                <a href=${req.body.siteUrl}
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Switch
                                                    to App
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>                  
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>

        </html>`
        const mailOptions={
            from:`${objSettings.siteTitle}<${objSettings.defaultEmail}>`,
            to:req.body.toEmail,
            subject:objSettings.welcomeEmailSubject,
            html:htmlContent
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log(info)
                res.status(200).send(new Confirmation('success','Successfully sent email!'))
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//forget password email
const forgetPasswordEmail=async(req,res)=>{
    try {
        const objSettings=await Settings.list()
        const transporter=nodemailer.createTransport({
            host:objSettings.host,
            port:objSettings.port,
            secure:objSettings.port==587?false:true,
            auth:{
                user:objSettings.defaultEmail,
                pass:objSettings.password
            }
        })

        const htmlContent=
        `<!doctype html>
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>[subject]</title>
            <meta name="description" content="Forget Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <a href=${req.body.siteUrl} title="logo" target="_blank">
                                        <img width="60" src=${req.body.logoPath} title="logo" alt="logo">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                    ${objSettings.forgetPasswordEmailHeader}
                                                </h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    ${objSettings.forgetPasswordEmailBody}
                                                </p>
                                                <a href=${req.body.resetLink}
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                    Reset Password
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>                  
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>

        </html>`
        const mailOptions={
            from:`${objSettings.siteTitle}<${objSettings.defaultEmail}>`,
            to:req.body.toEmail,
            subject:objSettings.forgetPasswordEmailSubject,
            html:htmlContent
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log(info)
                res.status(200).send(new Confirmation('success','Successfully sent email!'))
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

const getAllSettings=async(req,res)=>{
    try {
        const setting=await Settings.list()
        res.status(200).send(setting)
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update general setting
const updateGeneralSetting=async(req,res)=>{
    try {
        const objSettings=new Settings({
            siteSettingsId:req.body.siteSettingsId,
            siteTitle:req.body.siteTitle,
            welComeMessage:req.body.welComeMessage,
            copyRightText:req.body.copyRightText,
            allowWelcomeEmail:req.body.allowWelcomeEmail,
            allowFaq:req.body.allowFaq,
            version:req.body.version,
            logoPath:req.body.logoPath,
            faviconPath:req.body.faviconPath,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        Settings.updateGeneral(objSettings)
        res.status(200).send(new Confirmation('success','Successfully saved!'))
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update email setting
const updateEmailSetting=async(req,res)=>{
    try {
        const objSettings=new Settings({
            siteSettingsId:req.body.siteSettingsId,
            defaultEmail:req.body.defaultEmail,
            password:req.body.password,
            host:req.body.host,
            port:req.body.port,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        Settings.updateEmailConfig(objSettings)
        res.status(200).send(new Confirmation('success','Successfully saved!'))
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update color setting
const updateColorSetting=async(req,res)=>{
    try {
        const objSettings=new Settings({
            siteSettingsId:req.body.siteSettingsId,
            appBarColor:req.body.appBarColor,
            headerColor:req.body.headerColor,
            footerColor:req.body.footerColor,
            bodyColor:req.body.bodyColor,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        Settings.updateColor(objSettings)
        res.status(200).send(new Confirmation('success','Successfully saved!'))
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update email text
const updateEmailText=async(req,res)=>{
    try {
        const objSettings=new Settings({
            siteSettingsId:req.body.siteSettingsId,
            forgetPasswordEmailSubject:req.body.forgetPasswordEmailSubject,
            forgetPasswordEmailHeader:req.body.forgetPasswordEmailHeader,
            forgetPasswordEmailBody:req.body.forgetPasswordEmailBody,
            welcomeEmailSubject:req.body.welcomeEmailSubject,
            welcomeEmailHeader:req.body.welcomeEmailHeader,
            welcomeEmailBody:req.body.welcomeEmailBody,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        Settings.updateEmailText(objSettings)
        res.status(200).send(new Confirmation('success','Successfully saved!'))
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update landing text
const updateLandingText=async(req,res)=>{
    try {
        const objSettings=new Settings({
            siteSettingsId:req.body.siteSettingsId,
            homeHeader1:req.body.homeHeader1,
            homeDetail1:req.body.homeDetail1,
            homePicture:req.body.homePicture,
            homeHeader2:req.body.homeHeader2,
            homeDetail2:req.body.homeDetail2,
            homeBox1Header:req.body.homeBox1Header,
            homeBox1Detail:req.body.homeBox1Detail,
            homeBox2Header:req.body.homeBox2Header,
            homeBox2Detail:req.body.homeBox2Detail,
            homeBox3Header:req.body.homeBox3Header,
            homeBox3Detail:req.body.homeBox3Detail,
            homeBox4Header:req.body.homeBox4Header,
            homeBox4Detail:req.body.homeBox4Detail,
            feature1Header:req.body.feature1Header,
            feature1Detail:req.body.feature1Detail,
            feature1Picture:req.body.feature1Picture,
            feature2Header:req.body.feature2Header,
            feature2Detail:req.body.feature2Detail,
            feature2Picture:req.body.feature2Picture,
            feature3Header:req.body.feature3Header,
            feature3Detail:req.body.feature3Detail,
            feature3Picture:req.body.feature3Picture,
            feature4Header:req.body.feature4Header,
            feature4Detail:req.body.feature4Detail,
            feature4Picture:req.body.feature4Picture,
            registrationText:req.body.registrationText,
            contactUsText:req.body.contactUsText,
            contactUsTelephone:req.body.contactUsTelephone,
            contactUsEmail:req.body.contactUsEmail,
            footerText:req.body.footerText,
            footerFacebook:req.body.footerFacebook,
            footerTwitter:req.body.footerTwitter,
            footerLinkedin:req.body.footerLinkedin,
            footerInstagram:req.body.footerInstagram,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        Settings.updateLanding(objSettings)
        res.status(200).send(new Confirmation('success','Successfully saved!'))
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//upload logo
const uploadLogo=(req,res)=>{
    try {    
        // Multer Configuration
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'resources/logo');
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
            const pathToSend='/logo/'+req.file.filename
            res.status(200).send({dbPath:pathToSend})
        })      
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//upload favicon
const uploadFavicon=(req,res)=>{
    try {    
        // Multer Configuration
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'resources/favicon');
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
            const pathToSend='/favicon/'+req.file.filename
            res.status(200).send({dbPath:pathToSend})
        })      
    } catch (error) {
        console.log(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//fetch all faq
const allFaq=async(req,res)=>{
    try {
        const faqs=await Faq.allFaq()
        res.status(200).send(faqs)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//fetch single faq
const findFaq=async(req,res)=>{
    try {
        const {id}=req.params
        const faq=await Faq.findBy(id)
        if(faq){
            res.status(200).send(faq)
        }else{
            res.status(202).send(new Confirmation('error','Faq not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//delete single faq
const deleteFaq=async(req,res)=>{
    try {
        const {id}=req.params
        await Faq.deleteBy(id)
        res.status(200).send(new Confirmation('success','Deleted successfully!'))
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//create new faq
const createNewFaq=async(req,res)=>{
    try {
        //create a user object
        const faq=new Faq({
            title:req.body.title,
            description:req.body.description,
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy,
            dateAdded:new Date()
        })
        
        const checkLength=await Faq.create(faq)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This title already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//update faq
const updateFaq=async(req,res)=>{
    try {       
        const faq=new Faq({
            faqId:req.body.faqId,
            title:req.body.title,
            description:req.body.description,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
       //console.log(faq)
       const checkLength=await Faq.update(faq)
       if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This faq already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//fetch all contact
const allContact=async(req,res)=>{
    try {
        const contact=await Contact.allContact()
        res.status(200).send(contact)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//create new contact
const createNewContact=async(req,res)=>{
    try {
        //create a user object
        const contact=new Contact({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message,
            dateAdded:new Date()
        })        
        await Contact.create(contact)
        res.status(200).send(new Confirmation('success','Successfully saved'))          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//fetch all error log
const allErrorLog=async(req,res)=>{
    try {
        const logs=await ErrorLog.allLog()
        res.status(200).send(logs)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//create new error log
const createNewErrorLog=async(req,res)=>{
    try {
        //create a user object
        const log=new ErrorLog({
            status:req.body.status,
            statusText:req.body.statusText,
            url:req.body.url,
            message:req.body.message,
            addedBy:req.body.addedBy,
            dateAdded:new Date()
        })        
        await ErrorLog.create(log)
        res.status(200).send(new Confirmation('success','Successfully saved'))          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

module.exports={welcomeEmail,forgetPasswordEmail,getAllSettings,updateGeneralSetting,updateEmailSetting,updateColorSetting,updateLandingText,updateEmailText,uploadLogo,uploadFavicon,
    allFaq,findFaq,deleteFaq,createNewFaq,updateFaq,allContact,createNewContact,allErrorLog,createNewErrorLog
}
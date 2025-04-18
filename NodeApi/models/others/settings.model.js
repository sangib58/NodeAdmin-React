const sql=require('../../configs/db-connection')

//constructor
const Settings=function(settings){
    if(typeof settings.siteSettingsId!='undefined'){
        this.siteSettingsId=settings.siteSettingsId
    }
    this.siteTitle=settings.siteTitle
    this.welComeMessage=settings.welComeMessage
    this.copyRightText=settings.copyRightText
    this.allowWelcomeEmail=settings.allowWelcomeEmail
    this.allowFaq=settings.allowFaq
    this.version=settings.version
    this.logoPath=settings.logoPath
    this.faviconPath=settings.faviconPath
    this.defaultEmail=settings.defaultEmail
    this.password=settings.password
    this.host=settings.host
    this.port=settings.port
    this.appBarColor=settings.appBarColor
    this.headerColor=settings.headerColor
    this.footerColor=settings.footerColor
    this.bodyColor=settings.bodyColor
    this.forgetPasswordEmailSubject=settings.forgetPasswordEmailSubject
    this.forgetPasswordEmailHeader=settings.forgetPasswordEmailHeader
    this.forgetPasswordEmailBody=settings.forgetPasswordEmailBody
    this.welcomeEmailSubject=settings.welcomeEmailSubject
    this.welcomeEmailHeader=settings.welcomeEmailHeader
    this.welcomeEmailBody=settings.welcomeEmailBody
    this.homeHeader1=settings.homeHeader1
    this.homeDetail1=settings.homeDetail1
    this.homePicture=settings.homePicture
    this.homeHeader2=settings.homeHeader2
    this.homeDetail2=settings.homeDetail2
    this.homeBox1Header=settings.homeBox1Header
    this.homeBox1Detail=settings.homeBox1Detail
    this.homeBox2Header=settings.homeBox2Header
    this.homeBox2Detail=settings.homeBox2Detail
    this.homeBox3Header=settings.homeBox3Header
    this.homeBox3Detail=settings.homeBox3Detail
    this.homeBox4Header=settings.homeBox4Header
    this.homeBox4Detail=settings.homeBox4Detail
    this.feature1Header=settings.feature1Header
    this.feature1Detail=settings.feature1Detail
    this.feature1Picture=settings.feature1Picture
    this.feature2Header=settings.feature2Header
    this.feature2Detail=settings.feature2Detail
    this.feature2Picture=settings.feature2Picture
    this.feature3Header=settings.feature3Header
    this.feature3Detail=settings.feature3Detail
    this.feature3Picture=settings.feature3Picture
    this.feature4Header=settings.feature4Header
    this.feature4Detail=settings.feature4Detail
    this.feature4Picture=settings.feature4Picture
    this.registrationText=settings.registrationText
    this.contactUsText=settings.contactUsText
    this.contactUsTelephone=settings.contactUsTelephone
    this.contactUsEmail=settings.contactUsEmail
    this.footerText=settings.footerText
    this.footerFacebook=settings.footerFacebook
    this.footerTwitter=settings.footerTwitter
    this.footerLinkedin=settings.footerLinkedin
    this.footerInstagram=settings.footerInstagram
    this.isActive=settings.isActive
    this.dateAdded=settings.dateAdded
    this.addedBy=settings.addedBy
    this.isMigrationData=settings.isMigrationData
    this.lastUpdatedDate=settings.lastUpdatedDate
    this.lastUpdatedBy=settings.lastUpdatedBy
}

//all settings
Settings.list=async()=>{
    const rows=await sql.query('select * FROM sitesettings')
    return rows[0]
}

//update general settings
Settings.updateGeneral=async(objSettings)=>{
    const {siteTitle,welComeMessage,copyRightText,allowWelcomeEmail,allowFaq,version,logoPath,faviconPath,lastUpdatedBy,lastUpdatedDate,siteSettingsId}=objSettings
    await sql.query('update sitesettings set siteTitle=?,welComeMessage=?,copyRightText=?,allowWelcomeEmail=?,allowFaq=?,version=?,logoPath=?,faviconPath=?,lastUpdatedBy=?,lastUpdatedDate=? where siteSettingsId=?',[siteTitle,welComeMessage,copyRightText,allowWelcomeEmail,allowFaq,version,logoPath,faviconPath,lastUpdatedBy,lastUpdatedDate,siteSettingsId])
    return
}

//update email settings
Settings.updateEmailConfig=async(objSettings)=>{
    const {defaultEmail,password,host,port,lastUpdatedBy,lastUpdatedDate,siteSettingsId}=objSettings
    await sql.query('update sitesettings set defaultEmail=?,password=?,host=?,port=?,lastUpdatedBy=?,lastUpdatedDate=? where siteSettingsId=?',[defaultEmail,password,host,port,lastUpdatedBy,lastUpdatedDate,siteSettingsId])
    return
}

//update color settings
Settings.updateColor=async(objSettings)=>{
    const {appBarColor,headerColor,footerColor,bodyColor,lastUpdatedBy,lastUpdatedDate,siteSettingsId}=objSettings
    await sql.query('update sitesettings set appBarColor=?,headerColor=?,footerColor=?,bodyColor=?,lastUpdatedBy=?,lastUpdatedDate=? where siteSettingsId=?',[appBarColor,headerColor,footerColor,bodyColor,lastUpdatedBy,lastUpdatedDate,siteSettingsId])
    return
}

//update landing settings
Settings.updateLanding=async(objSettings)=>{
    const {homeHeader1,homeDetail1,homePicture,homeHeader2,homeDetail2,homeBox1Header,homeBox1Detail,homeBox2Header,homeBox2Detail,homeBox3Header,homeBox3Detail,homeBox4Header,homeBox4Detail,feature1Header,feature1Detail,feature1Picture,feature2Header,feature2Detail,feature2Picture,feature3Header,feature3Detail,feature3Picture,feature4Header,feature4Detail,feature4Picture,registrationText,contactUsText,contactUsTelephone,contactUsEmail,footerText,footerFacebook,footerTwitter,footerLinkedin,footerInstagram,lastUpdatedBy,lastUpdatedDate,siteSettingsId}=objSettings
    await sql.query('update sitesettings set homeHeader1=?,homeDetail1=?,homePicture=?,homeHeader2=?,homeDetail2=?,homeBox1Header=?,homeBox1Detail=?,homeBox2Header=?,homeBox2Detail=?,homeBox3Header=?,homeBox3Detail=?,homeBox4Header=?,homeBox4Detail=?,feature1Header=?,feature1Detail=?,feature1Picture=?,feature2Header=?,feature2Detail=?,feature2Picture=?,feature3Header=?,feature3Detail=?,feature3Picture=?,feature4Header=?,feature4Detail=?,feature4Picture=?,registrationText=?,contactUsText=?,contactUsTelephone=?,contactUsEmail=?,footerText=?,footerFacebook=?,footerTwitter=?,footerLinkedin=?,footerInstagram=?,lastUpdatedBy=?,lastUpdatedDate=? where siteSettingsId=?',[homeHeader1,homeDetail1,homePicture,homeHeader2,homeDetail2,homeBox1Header,homeBox1Detail,homeBox2Header,homeBox2Detail,homeBox3Header,homeBox3Detail,homeBox4Header,homeBox4Detail,feature1Header,feature1Detail,feature1Picture,feature2Header,feature2Detail,feature2Picture,feature3Header,feature3Detail,feature3Picture,feature4Header,feature4Detail,feature4Picture,registrationText,contactUsText,contactUsTelephone,contactUsEmail,footerText,footerFacebook,footerTwitter,footerLinkedin,footerInstagram,lastUpdatedBy,lastUpdatedDate,siteSettingsId])
    return
}

//update email text settings
Settings.updateEmailText=async(objSettings)=>{
    const {forgetPasswordEmailSubject,forgetPasswordEmailHeader,forgetPasswordEmailBody,welcomeEmailSubject,welcomeEmailHeader,welcomeEmailBody,lastUpdatedBy,lastUpdatedDate,siteSettingsId}=objSettings
    await sql.query('update sitesettings set forgetPasswordEmailSubject=?,forgetPasswordEmailHeader=?,forgetPasswordEmailBody=?, welcomeEmailSubject=?,welcomeEmailHeader=?,welcomeEmailBody=?,lastUpdatedBy=?,lastUpdatedDate=? where siteSettingsId=?',[forgetPasswordEmailSubject,forgetPasswordEmailHeader,forgetPasswordEmailBody,welcomeEmailSubject,welcomeEmailHeader,welcomeEmailBody,lastUpdatedBy,lastUpdatedDate,siteSettingsId])
    return
}

module.exports=Settings
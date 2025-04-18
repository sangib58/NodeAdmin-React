const sql=require('../../configs/db-connection')
const {uuidv4}=require('../../helpers/guid-generator')

//constructor
const LogHistory=function(log){
    this.logCode=log.logCode
    this.logDate=log.logDate
    this.userId=log.userId
    this.logInTime=log.logInTime
    this.logOutTime=log.logOutTime
    this.ip=log.ip
    this.browser=log.browser
    this.browserVersion=log.browserVersion
    this.platform=log.platform
}

//create log history
LogHistory.create=async(newHistory)=>{
    newHistory.logCode=uuidv4()
    const history=await sql.query('insert into loghistory set ?',newHistory)
    const row=await sql.query('select * from loghistory where logId=?',history.insertId)
    return row[0]
}

//update log history
LogHistory.update=async(objHistory)=>{
    const {logCode,logOutTime}=objHistory
    await sql.query('update loghistory set logOutTime=? where logCode=?',[logOutTime,logCode])
    return
}

//get browse history
LogHistory.browse=async()=>{ 
    const rows=sql.query('SELECT u.userId,u.userRoleId,u.fullName,u.email,l.logInTime,l.logOutTime,l.ip,l.browser,l.browserVersion,l.platform FROM loghistory l,users u where l.userId=u.userId order by l.logdate desc')
    return rows
}

//get notification
LogHistory.notification=async(id)=>{ 
    const rows=sql.query('SELECT u.userId,u.userRoleId,u.fullName,u.email,l.logInTime,l.logOutTime,l.ip,l.browser,l.browserVersion,l.platform FROM loghistory l,users u where l.userId=u.userId and u.userId=? and l.logDate>=DATE_SUB(CURDATE(), INTERVAL 3 DAY)',[id])
    return rows
}

//get date wise login data
LogHistory.dateLogin=async(id)=>{
    let rows=[]
    const userRow=await sql.query('select * from users where userId=?',id)
    if(userRow[0].userRoleId==1){
        rows=await sql.query('select date(logDate) date ,count(*) count from loghistory group by date(logdate) order by date(logdate) desc')
    }else{
        rows=await sql.query('select date(logDate) date ,count(*) count from loghistory where userId=? group by date(logdate) order by date(logdate) desc',id)
    }    
    return rows;
}

//get month wise login data
LogHistory.monthLogin=async(id)=>{
    let rows=[]
    const userRow=await sql.query('select * from users where userId=?',id)
    if(userRow[0].userRoleId==1){
        rows=await sql.query('select monthname(logDate) month,count(*) count from loghistory group by monthname(logdate) order by monthname(logdate) desc')
    }else{
        rows=await sql.query('select monthname(logDate) month,count(*) count from loghistory where userId=? group by monthname(logdate) order by monthname(logdate) desc',id)
    }    
    return rows;
}

//get year wise login data
LogHistory.yearLogin=async(id)=>{
    let rows=[]
    const userRow=await sql.query('select * from users where userId=?',id)
    if(userRow[0].userRoleId==1){
        rows=await sql.query('select year(logDate) year,count(*) count from loghistory group by year(logdate) order by year(logdate) desc')
    }else{
        rows=await sql.query('select year(logDate) year,count(*) count from loghistory where userId=? group by year(logdate) order by year(logdate) desc',id)
    }    
    return rows;
}

//get browser wise login data
LogHistory.browserLogin=async(id)=>{
    let rows=[]
    const userRow=await sql.query('select * from users where userId=?',id)
    if(userRow[0].userRoleId==1){
        rows=await sql.query('select browser,count(*) count from loghistory group by browser')
    }else{
        rows=await sql.query('select browser,count(*) count from loghistory where userId=? group by browser',id)
    }    
    return rows;
}

//get role wise login data
LogHistory.roleLogin=async()=>{
    const rows=await sql.query('select r.roleName,count(*) count from users u,userrole r where u.userRoleId=r.userRoleId group by r.roleName')        
    return rows;
}

module.exports=LogHistory
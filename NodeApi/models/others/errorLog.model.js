const sql=require('../../configs/db-connection')

//constructor
const ErrorLog=function(log){
    if(typeof log.errorLogId!='undefined'){
        this.errorLogId=log.errorLogId
    }
    this.status=log.status
    this.statusText=log.statusText
    this.url=log.url
    this.message=log.message
    this.addedBy=log.addedBy
    this.dateAdded=log.dateAdded
}

//get all log
ErrorLog.allLog=async()=>{
    const rows=await sql.query('select * from errorlogs order by dateadded desc')
    if(rows.length>0){
        return rows
    }else{
        return []
    }
}

//create new log
ErrorLog.create=async(newLog)=>{
    await sql.query('insert into errorlogs set ?',newLog)
    return
}

module.exports=ErrorLog
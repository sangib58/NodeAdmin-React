const sql=require('../../configs/db-connection')

//constructor
const Faq=function(faq){
    if(typeof faq.faqId!='undefined'){
        this.faqId=faq.faqId
    }
    this.title=faq.title
    this.description=faq.description
    this.isActive=faq.isActive
    this.isMigrationData=faq.isMigrationData
    this.addedBy=faq.addedBy
    this.dateAdded=faq.dateAdded
    this.lastUpdatedDate=faq.lastUpdatedDate
    this.lastUpdatedBy=faq.lastUpdatedBy
}

//create new faq
Faq.create=async(newFaq)=>{
    const row=await sql.query('select * from faqs where title=?',newFaq.title)
    if(row.length==0){
        await sql.query('insert into faqs set ?',newFaq)
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//update faq
Faq.update=async(objFaq)=>{
    const {title,description,lastUpdatedDate,lastUpdatedBy,faqId}=objFaq
    const row=await sql.query('select * from faqs where faqId!=? and upper(title)=upper(?)',[faqId,title])
    if(row.length==0){
        await sql.query('update faqs set title=?, description=?, lastUpdatedDate=?,lastUpdatedBy=? where faqId=?',[title,description,lastUpdatedDate,lastUpdatedBy,faqId])
        return row.length
    }else if(row.length>0){
        return row.length
    }else{
        return
    }
}

//get all faq
Faq.allFaq=async()=>{
    const rows=await sql.query('select * from faqs')
    if(rows.length>0){
        return rows
    }else{
        return []
    }
}

//find user by user id
Faq.findBy=async(id)=>{
    const row=await sql.query('select * from faqs where faqId=?',id)
    if(row.length==1){
        return row[0]
    }
}

//delete user by user id
Faq.deleteBy=async(id)=>{
    await sql.query('delete from faqs where faqId=?',id)
}

module.exports=Faq
const sql=require('../../configs/db-connection')

//constructor
const Contact=function(contact){
    if(typeof contact.contactId!='undefined'){
        this.contactId=contact.contactId
    }
    this.name=contact.name
    this.email=contact.email
    this.message=contact.message
    this.dateAdded=contact.dateAdded
}

//get all contact
Contact.allContact=async()=>{
    const rows=await sql.query('select * from contacts order by dateadded desc')
    if(rows.length>0){
        return rows
    }else{
        return []
    }
}

//create new contact
Contact.create=async(newContact)=>{
    await sql.query('insert into contacts set ?',newContact)
    return
}

module.exports=Contact
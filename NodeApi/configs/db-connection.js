const mysql=require('mysql2')
const util=require('util')

const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    multipleStatements:true
})

connection.connect((error)=>{
    if (error) throw error
    console.log('Successfully connected to database')
})

connection.query=util.promisify(connection.query)

module.exports=connection
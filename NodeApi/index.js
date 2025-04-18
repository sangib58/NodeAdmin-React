const express=require('express')
const cors=require('cors')
const routes=require('./routes/router')
const app=express()
const {swaggerUi,swaggerSpec}=require('./swagger')

app.use(cors())
app.use(express.json())
app.use(express.static('resources'))
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/api',routes)

const port=process.env.PORT

app.listen(port,()=>{
    console.log(`Server listen at port ${port}`)
})

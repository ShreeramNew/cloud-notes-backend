const express=require('express')
const app=express()
const PORT=5000
const cors=require('cors')
const ConnectToMongo=require('./DataBase')
ConnectToMongo();
app.use(cors())
app.use(express.json())

app.use("/",require('./routers/SaveNote'))
app.use("/note",require('./routers/AccessPerticularNote'))

app.listen(PORT,()=>{
    console.log('Ready to listen');
})
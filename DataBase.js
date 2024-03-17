const mongoose=require('mongoose')
const ConectionUri="mongodb://127.0.0.1:27017/Notes"
const ConnectToMongo=async ()=>{
    await mongoose.connect(ConectionUri)
    console.log("Conection Done!");
}
module.exports=ConnectToMongo
const express = require("express");
const router = express.Router();
const NotesModel=require('../models/Notes')

router.get('/',(req,res)=>{
    const input=req.query.id
    console.log(input);
    res.send('yes')
})

module.exports=router
const connection=require('../DataBase');
const express=require('express');
const router=express.Router();

router.put("/",(req,res)=>{
    const body=req.body;
    const UpdateCommand=`update all_notes set title='${body.title}',content='${body.content}' where id='${body.id}'`;

    connection.query(UpdateCommand,(err,result)=>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(200).json(result);
        }
    })
})
module.exports=router;
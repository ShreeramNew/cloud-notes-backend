const express = require("express");
const router = express.Router();
const connection = require("../DataBase");

router.delete('/',(req,res)=>{
    let id=req.query.id;
    if(id){
        const deleteCommand=`delete from all_notes where id='${id}'`;
        connection.query(deleteCommand,(err,result)=>{
            if(err){
                res.status(400).json(err)
            }
            else{
                res.status(200).json({
                    aknowledge:"Deleted succeffully"
                })
            }
        })
    }
})

module.exports = router;

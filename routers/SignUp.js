const express = require("express");
const router = express.Router();
const connection = require("../DataBase");
const jwt=require('jsonwebtoken');
require("dotenv").config();

router.post("/", (req, res) => {
   let { uname, password } = req.body;
   let InsertCommand = "Insert into users(username,password)values(?,?)";
   connection.query(InsertCommand, [uname, password], (err, result) => {
      if (err) {
         res.status(500).json({ msg: "Error while creating account!" });
      } else {
         let token=jwt.sign({uid:result.insertId},process.env.PRIVATE_KEY);
         res.cookie("authToken",token,{
            httpOnly:true,
            sameSite:"none",
            secure:true
         });
         res.status(200).json({msg:"Succefull"});
      }
   });
});

module.exports = router;

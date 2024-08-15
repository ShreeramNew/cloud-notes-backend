const express = require("express");
const router = express.Router();
const connection = require("../DataBase");
const jwt=require('jsonwebtoken');
require('dotenv').config();

router.post("/", (req, res) => {
   let body = req.body;
   let token=req.cookies.authToken;
   let payload=jwt.verify(token,process.env.PRIVATE_KEY);
   let uid=payload.uid;
   const InsertCommand = `Insert into all_notes(uid,title,content) values(?,?,?)`;
   connection.query(
      InsertCommand,
      [uid, body.title, body.content],
      (err, result) => {
         if (err) {
            res.status(400).json(err.code);
            console.log(err);
            
         } else {
           res.status(201).json(result);
         }
      }
   );
});

module.exports = router;

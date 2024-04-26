const express = require("express");
const router = express.Router();
const connection = require("../DataBase");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, res) => {
   let body = req.body;
   const uniqueId=uuidv4();
   const InsertCommand = `Insert into all_notes(id,email,title,content) values(?,?,?,?)`;
   connection.query(
      InsertCommand,
      [uniqueId, body.email, body.title, body.content],
      (err, result) => {
         if (err) {
            res.status(400).json(err.code);
         } else {
           res.status(201).json({
            aknowledge:"Notes saved succeffully"
           })
         }
      }
   );
});

module.exports = router;

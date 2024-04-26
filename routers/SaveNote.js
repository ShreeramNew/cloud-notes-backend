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
            console.log(err);
         } else {
            console.log(result);
            console.log("Saved Succefully!");
         }
      }
   );
   res.send("Super");
});

router.get("/",(req, res) => {
 //Nothing
});
module.exports = router;

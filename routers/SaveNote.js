const express = require("express");
const router = express.Router();
const connection = require("../DataBase");

router.post("/", (req, res) => {
   let body = req.body;
   const InsertCommand = `Insert into all_notes(email,title,content) values(?,?,?)`;
   connection.query(
      InsertCommand,
      [body.email, body.title, body.content],
      (err, result) => {
         if (err) {
            res.status(400).json(err.code);
         } else {
           res.status(201).json(result);
         }
      }
   );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const connection = require("../DataBase");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.delete("/", (req, res) => {
   let id = req.query.id;
   let token = req.cookies.authToken;
   let payload = jwt.verify(token, process.env.PRIVATE_KEY);
   let uid=payload.uid;
   if (id) {
      const deleteCommand = `delete from all_notes where uid='${uid}' and id='${id}'`;
      connection.query(deleteCommand, (err, result) => {
         if (err) {
            res.status(400).json(err);
         } else {
            res.status(200).json(result);
         }
      });
   }
});

module.exports = router;

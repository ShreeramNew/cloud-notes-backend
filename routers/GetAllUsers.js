const express = require("express");
const router = express.Router();
const connection = require("../DataBase");

router.get("/", (req, res) => {
   let selectStatement = "select username from users";
   connection.query(selectStatement, (err, result) => {
      if (err) {
         console.log(err);
         res.status(500).json({ msg: "Error while fetching users" });
      } else {
         res.status(200).json(result);
      }
   });
});

module.exports = router;

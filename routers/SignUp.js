const express = require("express");
const router = express.Router();
const connection = require("../DataBase");
const HashPassword = require("../middlewares/HashPassword");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", HashPassword, (req, res) => {
   let { username, password } = req.body;
   let InsertCommand = "Insert into users(username,password)values(?,?)";
   connection.query(InsertCommand, [username, password], (err, result) => {
      if (err) {
         console.log(err);
         res.status(500).json({ msg: "Error while creating account!" });
      } else {
         //Once the account is created,send a token with uid
         let token = jwt.sign({ uid: result.insertId }, process.env.PRIVATE_KEY);
         res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
         });
         res.status(200).json({ msg: "Succefull" });
      }
   });
});

module.exports = router;

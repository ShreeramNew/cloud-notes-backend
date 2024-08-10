const express = require("express");
const router = express.Router();
const connection = require("../DataBase");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/", (req, res) => {
   let { username, password } = req.body;
   let statement = "select * from users where username=?";

   connection.query(statement, [username], (err, result) => {
      if (err) {
         console.log(err);
         return res.status(500).json({ msg: "Something went wrong!" });
      }
      if (!result[0]) {
         //If result is a empty array, then it means no such user found
         return res.status(400).json({ msg: "Username not found!" });
      }
      //If username is found, then verify the password

      let storedPassword = result[0].password;//Get already stored password
      bcrypt.compare(password, storedPassword, (err, verified) => {
         if (err) {
            return res.status(400).json({ msg: "Please enter valid username and password!" });
         }
         if (verified) {
            //If verified, then send a authToken
            let token = jwt.sign({ uid: result[0].uid }, process.env.PRIVATE_KEY);
            res.cookie("authToken", token, {
               httpOnly: true,
               sameSite: "none",
               secure: true,
            });
            res.status(200).json({ msg: "Succefull!" });
         } else {
            //If verified is false, then  password is incorrect
            return res.status(400).json({ msg: "Please enter valid username and password!" });
         }
      });
   });
});
module.exports = router;

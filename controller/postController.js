const connection = require("../DataBase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

module.exports = {
   //----------------------------------------Creating a new account (Sign up)----------------------------------------------------------
   createAccount: (req, res) => {
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
   },

   //-------------------------------------------Save a new note------------------------------------------------------------------------
   saveNote: (req, res) => {
      let body = req.body;
      let token = req.cookies.authToken;
      let payload = jwt.verify(token, process.env.PRIVATE_KEY);
      let uid = payload.uid;
      const InsertCommand = `Insert into all_notes(uid,title,content) values(?,?,?)`;
      connection.query(InsertCommand, [uid, body.title, body.content], (err, result) => {
         if (err) {
            res.status(400).json(err.code);
            console.log(err);
         } else {
            res.status(201).json(result);
         }
      });
   },

   //--------------------------------------------Login-----------------------------------------------------------------------------------
   login: (req, res) => {
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
 },

 //

};

const express = require("express");
const router = express.Router();
const HashPassword = require("../middlewares/HashPassword");
require("dotenv").config();
const postController = require("../controller/postController");
const getController=require("../controller/getController");

router.post("/signup", HashPassword, postController.createAccount); //create a new account (signup)
router.post("/login", postController.login);// Authenticate a existing user
router.get("/getUsers", getController.getAllUser);// Get all user names

module.exports = router;

const express = require("express");
const router = express.Router();
const getController = require("../controller/getController");
const postController=require("../controller/postController");
const deleteController=require('../controller/deleteController');
const updateController = require("../controller/updateController");


router.get("/getNotes",getController.getNotes);
router.post("/save",postController.saveNote);
router.delete("/delete", deleteController.deleteNote);
router.put("/update", updateController.updateNote);

module.exports = router;

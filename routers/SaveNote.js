const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");

router.post("/", async (req, res) => {
   let body = req.body;
   await Notes.create({ title: body.title, content: body.content });
   console.log("Saved Succefully!");
   res.send("Super");
});
router.get("/", async (req, res) => {
   Notes.find({})
      .then((results) => {
         if (results) {
            res.send(results);
         }
      })
      .catch((error) => res.send(error));
});
module.exports = router;

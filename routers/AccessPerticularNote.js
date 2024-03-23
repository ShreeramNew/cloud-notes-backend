const express = require("express");
const router = express.Router();
const NotesModel = require("../models/Notes");

router.get("/", async (req, res) => {
   const input = req.query.id;
   try {
      let data = await NotesModel.findById(input);
      res.json(data)
   } catch (error) {
      res.send(error);
   }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const connection = require("../DataBase");

router.get("/", async (req, res) => {
   // console.log(req);
   const noteId = req.query.id;
   if (noteId) {
      //If id is provided, then fetch perticular note
      const selectCommand = `select * from all_notes where id='${noteId}'`;
      connection.query(selectCommand, (err, result) => {
         if (err) {
            res.status(400).json(err.code)
         } else {
            res.status(200).json(result);
         }
      });
   }
   else{
      //If the id is not provided in query, then fetch all notes
      const selectCommand = 'select * from all_notes order by createdOn';
      connection.query(selectCommand, (err, result) => {
         if (err) {
            res.status(400).json(err.code)
         } else {
            res.status(200).json(result);
         }
      });
   }
});

module.exports = router;

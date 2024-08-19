const connection = require("../DataBase");
const jwt = require("jsonwebtoken");


module.exports = {
   //---------------------------Get all usernames----------------------------------------------------------
   getAllUser: (req, res) => {
      let selectStatement = "select username from users";
      connection.query(selectStatement, (err, result) => {
         if (err) {
            console.log(err);
            res.status(500).json({ msg: "Error while fetching users" });
         } else {
            res.status(200).json(result);
         }
      });
   },

   //---------------------------------------Get perticular/all notes-----------------------------------------
   getNotes: async (req, res) => {
      const noteId = req.query.id;
      let token = req.cookies.authToken;

      //Check if user is authorised or not
      if (token) {
         let payload = jwt.verify(token, process.env.PRIVATE_KEY);
         let uid = payload.uid;
         if (uid) {
            //if authorised, then fetch the data
            if (noteId) {
               //If id is provided, then fetch perticular note
               const selectCommand = `select * from all_notes where uid='${uid}' and id='${noteId}'`;
               connection.query(selectCommand, (err, result) => {
                  if (err) {
                     res.status(400).json(err.code);
                  } else {
                     res.status(200).json(result);
                  }
               });
            } else {
               //If the id is not provided in query, then fetch all notes
               const selectCommand = `select * from all_notes where uid='${uid}' order by createdOn`;
               connection.query(selectCommand, (err, result) => {
                  if (err) {
                     res.status(400).json(err.code);
                  } else {
                     res.status(200).json(result);
                  }
               });
            }
         } else {
            res.status(401).json({ msg: "Not authorised" });
         }
      } else {
         res.status(401).json({ msg: "Not authorised" });
      }
   },
};

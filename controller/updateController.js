const jwt = require("jsonwebtoken");
const connection = require("../DataBase");

module.exports = {
   //-----------------------Update a existing note------------------------------------------
   updateNote: (req, res) => {
      const body = req.body;
      let token = req.cookies.authToken;
      let payload = jwt.verify(token, process.env.PRIVATE_KEY);
      let uid = payload.uid;
      const UpdateCommand = `update all_notes set title='${body.title}',content='${body.content}' where uid='${uid}' and id='${body.id}'`;
      connection.query(UpdateCommand, (err, result) => {
         if (err) {
            res.status(400).json(err);
         } else {
            res.status(200).json(result);
         }
      });
   },
};

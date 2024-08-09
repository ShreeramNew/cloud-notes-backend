const bcrypt = require("bcrypt");

const HashPassword = (req, res, next) => {
   const password = req.body.password;
   if (!password) {
      res.status(400).json({ msg: "Password must be sent!" });
   } else {
      bcrypt.hash(password, 10, (err, hash) => {
         if (err) {
            res.status(500).json({ msg: "Internal server error!" });
         } else {
            req.body.password = hash;
            next();
         }
      });
   }
};

module.exports=HashPassword;
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParse=require('cookie-parser');


app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParse());


app.use("/api/auth", require("./routers/Authentication")); //Everything related to authenticatio
app.use("/api/notes", require("./routers/Notes")); //Everything related to user's note

app.listen(5000, () => {
   console.log("Ready to listen!");
});

const express = require("express");
const app = express();
const PORT = 5000;
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


app.use("/signup", require("./routers/SignUp")); //To create new account
app.use("/login", require("./routers/Login")); //To login
app.use("/getUsers", require("./routers/GetAllUsers")); //To get all usernames
app.use("/notes", require("./routers/GetNotes")); //To access all or perticular notes
app.use("/save", require("./routers/SaveNote")); // To Save notes
app.use("/delete", require("./routers/DeleteNote")); //To delete a perticular note
app.use("/update", require("./routers/UpdateNote")); //To update a perticular note

app.listen(PORT, () => {
   console.log("Ready to listen!");
});

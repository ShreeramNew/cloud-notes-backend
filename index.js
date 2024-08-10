const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(cors({
   origin:"*",
   credentials:true
}));
app.use(express.json());


app.use("/signup",require("./routers/SignUp"));//To create new account
app.use("/login",require("./routers/Login"));//To login
app.use("/notes", require("./routers/GetNotes")); //To access all or perticular notes
app.use("/save", require("./routers/SaveNote")); // To Save notes
app.use("/delete", require("./routers/DeleteNote")); //To delete a perticular note
app.use("/update", require("./routers/UpdateNote")); //To update a perticular note



app.listen(PORT, () => {
   console.log("Ready to listen!");
});

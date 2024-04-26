const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/save", require("./routers/SaveNote")); // To Save notes or GET all notes
app.use("/notes", require("./routers/GetNotes")); //To access all or perticular notes

app.listen(PORT, () => {
   console.log("Ready to listen!");
});

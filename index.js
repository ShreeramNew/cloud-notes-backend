const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/notes", require("./routers/GetNotes")); //To access all or perticular notes
app.use("/save", require("./routers/SaveNote")); // To Save notes
app.use("/delete", require("./routers/DeleteNote")); //To delete a perticular note


app.listen(PORT, () => {
   console.log("Ready to listen!");
});

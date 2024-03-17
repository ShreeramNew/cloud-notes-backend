const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema([
   { title: { type: String, required: true } },
   { content: { type: String, required: true } },
]);

module.exports = mongoose.model("NotesCollection", NotesSchema);

const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    title: String,
    description: String,
    socialShare: Boolean,
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

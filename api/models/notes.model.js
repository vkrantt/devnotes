const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    title: String,
    description: String,
    socialShare: Boolean,
    tag: {
      type: String,
    },
    createdBy: {
      expertise: { type: String },
      username: { type: String },
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

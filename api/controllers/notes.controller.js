const User = require("../models/auth.model");
const Note = require("../models/notes.model");

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ socialShare: true });
    res.status(200).json({
      status: "ok",
      response: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

async function createNote(req, res) {
  const userId = req.user;
  const { title, description, socialShare } = req.body;
  try {
    const newNote = new Note({
      userId: userId,
      title,
      description,
      socialShare,
    });

    const savedNote = await newNote.save();
    res.status(200).json({
      status: "ok",
      response: "Note created successfully.",
      note: savedNote,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

async function getNoteDetail(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    const user = await User.findOne({ _id: note.userId });
    const data = {
      _id: note._id,
      userId: note.userId,
      title: note.title,
      description: note.description,
      socialShare: note.socialShare,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      createdBy: {
        userId: user._id,
        email: user.email,
        userImage: user.userImage,
        username: `${user.firstName} ${user.lastName}`,
        expertise: user.expertise,
      },
    };
    res.status(200).json({
      status: "ok",
      response: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

async function getNoteByUser(req, res) {
  const id = req.user;
  try {
    const notes = await Note.find({ userId: id });
    res.status(200).json({
      status: "ok",
      response: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

async function getNoteById(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    res.status(200).json({
      status: "ok",
      response: note,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

async function updateNoteById(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);

    if (note) {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        socialShare: req.body.socialShare,
        updatedAt: new Date(),
      };
      await Note.findByIdAndUpdate(id, { $set: payload }, { new: true });
      return res.status(200).json({
        status: "ok",
        response: "Note updated.",
      });
    }
    res.status(200).json({
      status: "fail",
      response: "Not found.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

module.exports = {
  getAllNotes,
  createNote,
  getNoteDetail,
  getNoteByUser,
  updateNoteById,
  getNoteById,
};

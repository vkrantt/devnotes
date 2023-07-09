const express = require('express');
const { getAllNotes, createNote, getNoteDetail, getNoteByUser,updateNoteById, getNoteById } = require('../controllers/notes.controller');
const authToken = require('../middlewares/verifyToken');
const router = express.Router()

router.route('/').get(getAllNotes);
router.route('/detail/:id').get(getNoteDetail);
router.route('/create').post(authToken, createNote);
router.route('/notebyid/:id').get(authToken, getNoteById)
router.route('/my-blogs').get(authToken,getNoteByUser);
router.route('/updatenote/:id').post(authToken,updateNoteById);

module.exports = router;
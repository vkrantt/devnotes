const express = require('express');
const { getAllNotes, createNote, getNoteDetail } = require('../controllers/notes.controller');
const authToken = require('../middlewares/verifyToken');
const router = express.Router()

router.route('/').get(getAllNotes);
router.route('/detail/:id').get(getNoteDetail);
router.route('/create').post(authToken, createNote);

module.exports = router;
const express = require('express');
const { getAllNotes } = require('../controllers/notes.controller');
const router = express.Router()

router.route('/').get(getAllNotes);

module.exports = router;
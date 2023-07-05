const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title : String,
    description : String,
    socialShare : Boolean
},
{ timestamps: true })

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
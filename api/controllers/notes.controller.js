const Note = require("../models/notes.model")

async function getAllNotes(req, res){
    try {
       const notes = await Note.find({socialShare : true});
       res.status(200).json({
        status : 'ok',
        response : notes
    })
    } catch (error) {
        res.status(500).json({
            status : 'error',
            error : error
        })
    }
}


async function createNote(req, res){
    const userId = req.user;
    const {title, description, socialShare} = req.body;
    try {
       const newNote = new Note({
        user: userId,
        title, description, socialShare
       });

       const savedNote = await newNote.save();
       res.status(200).json({
        status : 'ok',
        response : 'Note created successfully.',
        note: savedNote
    })
    } catch (error) {
        res.status(500).json({
            status : 'error',
            error : error
        })
    }
}



async function getNoteDetail(req, res){
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        res.status(200).json({
         status : 'ok',
         response : note
     })
     } catch (error) {
         res.status(500).json({
             status : 'error',
             error : error
         })
     }
}

module.exports = {getAllNotes, createNote, getNoteDetail}
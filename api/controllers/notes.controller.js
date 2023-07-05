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

module.exports = {getAllNotes}
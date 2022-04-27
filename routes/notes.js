const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const notes = require('express').Router();

notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
    
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    } else {    
        res.error('Error in adding note');
    }
});

module.exports = notes;
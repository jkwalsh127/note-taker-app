
const notes = require('express');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(SON.parse(data)));
});

    ps.post('/', (req, res) => {
    console.log(req.body);
    
    const {} = req.body;

    if (req.body) {
        const newNote = {
            title: noteTitle.value,
            text: noteText.value,
        };

        readAndAppend(newNote, './db.db.json');
        res.json(`Note added successfully!`);
    } else {    
        res.error('Error in adding note');
    }
});

module.exports = notes;
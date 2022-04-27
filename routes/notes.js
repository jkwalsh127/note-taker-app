
const notes = require('express');

notes.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

notes.post('/', (req, res) => {
    console.log(req.body);
    
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db.db.json');
        res.json(`Note added successfully!`);
    } else {    
        res.error('Error in adding note');
    }
});

module.exports = notes;
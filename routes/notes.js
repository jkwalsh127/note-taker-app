const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // readFromFile('./db/db.json', "utf-8").then((data) => {
    //     res.json(JSON.parse(data));
    // }).catch((error) => {
    //     console.error(`Unable to satisfy ${req.method} request`);
    //     console.error(error);
    //     res.json("unable to satisfy request")
    // })
});

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
  
        writeToFile('./db/db.json', result);
  
        // res.json('');
      });
  });

notes.post('/', (req, res) => {

    console.log(typeof req.body);

    const { title, text } = req.body;

        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
});

module.exports = notes;
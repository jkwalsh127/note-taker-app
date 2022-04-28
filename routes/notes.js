const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json', "utf-8").then((data) => {
        res.json(JSON.parse(data));
    }).catch((error) => {
        console.error(`Unable to satisfy ${req.method} request`);
        console.error(error);
        res.json("unable to satisfy request")
    })
});

notes.post('/', (req, res) => {
//     let errorLog = req.body;
//     errorLog = uuid();
//     readAndAppend(errorLog, "./db/diagnostics.json");
  
//     res.json(errorLog);
//   });

    const { title, text } = req.body;
    console.log(req.body);

        const newNote = {
            title,
            text,
            // title: "helooo",
            note_id: uuid(),
        };

        // let noteId = req.body;
        // noteId = uuid();

        readAndAppend(newNote, './db/db.json');
        // readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
});

module.exports = notes;
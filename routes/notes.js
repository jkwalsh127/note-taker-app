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

// notes.post('/', (req, res) => {
//     console.info(`${req.method} request received`);
  
//     const { title, text } = req.body;
  
//     if (title && text) {
//       const newNote = {
//         title,
//         text,
//         note_id: uuid(),
//       };
  
//       fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) {
//           console.error(err);
//         } else {
//           const parsedNote = JSON.parse(data);
  
//           parsedNote.push(newNote);
//           reviews = parsedNote;

//           fs.writeFile(
//             './db/db.json',
//             JSON.stringify(parsedNote, null, 4),
//             (writeErr) =>
//               writeErr
//                 ? console.error(writeErr)
//                 : console.info('Successfully updated notes')
//           );
//         }
//       });
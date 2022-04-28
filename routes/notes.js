const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    readFromFile('./db/db.json', "utf-8").then((data) => {
        res.json(JSON.parse(data));
    }).catch((error) => {
        console.error(`Unable to satisfy ${req.method} request`);
        console.error(error);
        res.json("unable to satisfy request")
    })
});

notes.get('/id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
  
        writeToFile('./db/db.json', result);
  
        res.json(`Item ${noteId} has been deleted`);
    });
  });

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
          title,
          text,
          id: uuid(),
        };
    
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
      } else {
        res.error('Error in adding note');
      }
    });

module.exports = notes;

// notes.post('/', (req, res) => {
//     console.info(`${req.method} request received`);
  
//     const { title, text } = req.body;
  
//     if (title && text) {
//       const newNote = {
//         title,
//         text,
//         id: uuid(),
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
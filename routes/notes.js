const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// notes.get('/', (req, res) => {
//     readFromFile('./db/db.json', "utf-8").then((data) => {
//         res.json(JSON.parse(data));
//     }).catch((error) => {
//         console.error(`Unable to satisfy ${req.method} request`);
//         console.error(error);
//         res.json("unable to satisfy request")
//     })
// });

// notes.post('/', (req, res) => {

//     const { title, text } = req.body;

//         const newNote = {
//             title,
//             text,
//             // title: "helooo",
//             note_id: uuid(),
//         };

//         readAndAppend(newNote, './db/db.json');

//         const response = {
//             status: 'success',
//             body: newNote,
//         };

//         res.json(response);
// });

module.exports = notes;
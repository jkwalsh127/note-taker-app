// import express.Router class and helper functions
const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// route to the database to return a stringified version
notes.get('/', (req, res) => {
    readFromFile('./db/db.json', "utf-8")
      .then((data) => {
        res.json(JSON.parse(data));
      }).catch(() => {
        res.json("unable to satisfy request")
      })
});

// route to the desired note by its unique id
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // filter through the database object to return a json response
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
});

// route to delete the user-selected note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // writes all notes to the database except the one matching the id of the note selected
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result);
      res.json(`Item ${noteId} has been deleted`);
    });
});

// route to save a new note to the database
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

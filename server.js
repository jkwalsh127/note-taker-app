// import server dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// set up port locally and for heroku
const PORT = process.env.PORT || 3005;
// allows the server to utilize the "express" module
const app = express();

// middleware to parse incoming requests with json and urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware for modular api router
app.use('/api', api);
// middleware for serving files from local directory
app.use(express.static('public'));

// set request routes to html responses
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/index.html'))
);
//bind and listen host and port
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
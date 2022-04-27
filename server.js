const express = require('express');
const path = require('path');
const api = require('./public/scripts/index.js');

const PORT = 3001;

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
app.use(express.static('pages'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

app.get('/api/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
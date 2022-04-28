const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3005;

const app = express();


// const sortHelper = (type) =>
//     dbData.sort(sortData(`${type}`, 'text'));

// app.use(express.json);
// app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// app.get('/', (req, res) => res.send('Navigate to ...'));
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// app.get('/api/db', (req, res) => res.json(dbData));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

// app.get('/api/notes', (req, res) => 
//     fs.readFile('./db/db.json', 'utf-8', (err, data) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.json(JSON.parse(data));
//         }
//     })
// );

// app.post('/api/notes', (req, res) => {
//     console.log(req.body);
    
//     const { title, text } = req.body;

//     if (req.body) {
//         const newNote = {
//             title,
//             text,
//         };

//         readAndAppend(newNote, './db.db.json');
//         res.json(`Note added successfully!`);
//     } else {    
//         res.error('Error in adding note');
//     }
// });


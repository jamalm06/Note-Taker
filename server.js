// const express = require('express');
// const path = require('path');
// const apiRouter = require('./routes/index.js');
// const PORT = process.env.PORT || 3001;

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api', apiRouter);

// app.use(express.static('public'));

// // GET Route for landing page and default to index.html
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// // GET /notes for notes.html file
// app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// // Return index.html for invalid routes
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));





const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  res.json(savedNotes);
});

app.post('/api/notes', (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  const newNote = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
  };

  savedNotes.push(newNote);

  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(savedNotes));

  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  const filteredNotes = savedNotes.filter((note) => note.id !== parseInt(req.params.id));

  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(filteredNotes));

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});


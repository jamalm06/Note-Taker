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

  const createdNote = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
  };

  savedNotes.push(createdNote);

  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(savedNotes));

  res.json(createdNote);
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


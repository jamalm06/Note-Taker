const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));


// Route to get all notes
app.get('/api/notes', (req, res) => {
  
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  res.json(notes);
});

// Route to save a new note
app.post('/api/notes', (req, res) => {
  
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  
  const newEntry = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
  };

  
  notes.push(newEntry);

  // Write the updated notes to the JSON file
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));

  res.json(newEntry);
});

// Route to delete a note
app.delete('/api/notes/:id', (req, res) => {
  
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(filteredNotes));

  res.sendStatus(200);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

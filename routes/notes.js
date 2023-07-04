// const express = require('express');
// const fs = require('fs');
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');
// const uuid = require('uuid');


// const router = express.Router();

// // GET route for retrieving a single note
// router.get('/:id', (req, res) => {
//   if (req.params.id) {
//     console.info(`${req.method} request received to get a single note`);
//     let noteId = req.params.id;
//     readFromFile('./db/db.json')
//       .then((data) => {
//         const notes = JSON.parse(data);
//         const foundNote = notes.find((note) => note.id === noteId);
//         if (foundNote) {
//           res.status(200).json(foundNote);
//         } else {
//           res.status(404).send('Note not found');
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error reading file');
//       });
//   } else {
//     res.status(400).send('Note ID not provided');
//   }
// });

// // GET route for retrieving all notes
// router.get('/', (req, res) => {
//   readFromFile('./db/db.json')
//     .then((data) => {
//       const notes = JSON.parse(data);
//       res.json(notes);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error reading file');
//     });
// });

// // POST route for creating a new note
// router.post('/', (req, res) => {
//   const { title, text } = req.body;
//   if (title && text) {
//     const newNote = {
//       title,
//       text,
//       id: uuid(),
//     };
//     readAndAppend(newNote, './db/db.json')
//       .then(() => {
//         const response = {
//           status: 'success',
//           body: newNote,
//         };
//         res.json(response);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error writing file');
//       });
//   } else {
//     res.status(400).json('Error in posting new note');
//   }
// });

// // DELETE route for deleting a note
// router.delete('/:id', async (req, res) => {
//   let noteId = req.params.id;
//   try {
//     const data = await readFromFile('./db/db.json');
//     const notes = JSON.parse(data);
//     const updatedNotes = notes.filter((note) => note.id !== noteId);
//     if (notes.length !== updatedNotes.length) {
//       fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send('Error writing file');
//         } else {
//           console.log('Notes JSON file successfully updated!');
//           res.json('Delete request complete.');
//         }
//       });
//     } else {
//       res.status(404).send('Note not found');
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error reading file');
//   }
// });

// module.exports = router;

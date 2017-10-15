'use strict';

const Note = require('./note.js');
const router = require('../lib/router.js');
const fs = require('fs-extra');
const databaseFile = __dirname + '/../model/data/notes.dat';

// let notes = {}; Dont need will store info in databaseFile

let sendStatus = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type' : 'application/json'
  });
  res.write(JSON.stringify(data));
  res.end();
  // console.log(data);
};

router.post('/api/notes', (req,res) => {
  if (! req.body.title) {
    return sendStatus(res, 400, 'Missing Title');
    
  }
  if (! req.body.content) {
    return sendStatus(res, 400, 'Missing Content');
  }

  let note = new Note(req.body);
  let data = {};
  data[note.id] = note;

  let saveNote = JSON.stringify(data);

  fs.outputFile(databaseFile, saveNote)
    .then(sendJSON(res, 201, note))
    .catch(err => sendStatus(res, 500, err));
  // notes[note.id] = note;
});
// console.log(sendStatus);

router.get('/api/notes', (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if (id) {
    fs.readJson(databaseFile)
      .then(allNotes => {
        let note = allNotes[id];
        sendJSON(res, 200, note);
      })
      .catch(err => sendStatus(res, 404, err));

    // if (notes[id]) {
    //   sendJSON(res, 200, notes[id]);
    // } else {
    //   sendStatus(res, 404, 'Note Not Found');
    // }
  } else {

    // let allNotes = {notes:notes};
    fs.readJson(databaseFile)
      .then(allNotes => sendJSON(res, 200, allNotes))
      .catch(err => sendStatus(res, 404, err));
  }
  
});

router.delete('/api/notes', (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;
  
  if (id) {
    fs.readJson(databaseFile)
      .then(allNotes => {
        delete allNotes[id];
        let saveNote = JSON.stringify(allNotes);
        
        fs.outputFile(databaseFile, saveNote)
          .then(sendJSON(res, 201, 'DELETED'))
          .catch(err => sendStatus(res, 500, err));
        // notes[note.id] = note;
      })
      .catch(err => sendStatus(res, 404, err));
  }
});

router.put('/api/notes', (req,res) => {
// Do I have an id?
// Is it valid
// Replace it
// Send 200 if all is well
    
});

router.patch('/api/notes', (req,res) => {
// Do I have an id?
// Is it valid
// Update it
// Send 200 if all is well
    
});


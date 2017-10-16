'use strict';

const Note = require('./note');
const router = require('../lib/router');
const databaseFile = __dirname + '/../model/data/notes.dat';
const storage = require('../lib/storage')(databaseFile);

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
  res.end(JSON.stringify(data));
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
  
  storage.saveItem(note)
    .then(item => sendJSON(res, 201, item))
    .catch(err => sendStatus(res, 500, err));
});
// console.log(sendStatus);

router.get('/api/notes', (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if (id) {

    storage.getItem(id)
      .then(item => sendJSON(res, 200, item))
      .catch(err => sendStatus(res, 500, err));
  } else {
    
    storage.getItems()
      .then(allNotes => sendJSON(res, 200, allNotes))
      .catch(err => sendStatus(res, 404, err));
    console.log('storage',storage.getItems);
  }
});
router.delete('/api/notes', (req,res) => {

  let id = req.url && req.url.query && req.url.query.id;
  
  if (id) {

    storage.deleteItem(id)
      .then(sendJSON(res, 200, 'File DELETED'))
      .catch(err => sendStatus(res, 500, err));
  }
});

// router.put('/api/notes', (req,res) => {
// Do I have an id?
// Is it valid
// Replace it
// Send 200 if all is well
    
// });

// router.patch('/api/notes', (req,res) => {
// Do I have an id?
// Is it valid
// Update it
// Send 200 if all is well
    
// });
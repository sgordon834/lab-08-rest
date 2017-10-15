'use strict';

const uuid = require('uuid/v1');

class Note {
    
  constructor(config) { 
    this.id = uuid();
    this.createdOn = new Date();
    this.title = config.title || '';
    this.content = config.content || '';
  } 
}
    
// Instance (prototype) Methods
//     toString() { 
//     }
    
// }

module.exports = Note;
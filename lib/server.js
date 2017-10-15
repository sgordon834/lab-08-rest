'use strict';

const http = require('http');
const router = require('./router');
const route = require('../model/route');
// const noteRouter = require(__dirname + '/../model/route.js');

let isRunning = false;

const app = http.createServer(router.route);

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if (! isRunning) {
        app.listen(process.env.PORT, (err) => {
          if (err) {
            reject(err);
          } else {
            isRunning = true;
            resolve(`Server running on port ${process.env.PORT}!`);
          }
        });
      } else {
        reject('Server is already running');
      }
    });
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if (! isRunning) {
        reject('Server is currently off');
      } else {
        app.close(err => {
          if (err) {
            reject(err);
          } else {
            isRunning = false;
            resolve('Shutting Down');
          }
        });
      }
    });
  }
};
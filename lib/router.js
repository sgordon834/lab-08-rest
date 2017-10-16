'use strict';

const parser = require('./parse-request');

// Route Registry
// Store route handlers for each of the verbs ...
/*
    i.e.
    GET: {
        "/api/note" : (req, res) => {},  ....
    }
*/
const routes = {
  GET: {},
  PUT: {},
  POST: {},
  PATCH: {},
  DELETE: {}
};

module.exports = {
  get: (uri, callback) => {
    routes.GET[uri] = callback;
  },
  post: (uri, callback) => {
    routes.POST[uri] = callback;
  },
  put: (uri, callback) => {
    routes.PUT[uri] = callback;
  },
  patch: (uri, callback) => {
    routes.PATCH[uri] = callback;
  },
  delete: (uri, callback) => {
    routes.DELETE[uri] = callback;
  },
  route: (req, res) => {
    // parse the request
    parser(req)
      .then((req) => {
        // console.log('routes', routes);
      //find handler
        let handler = routes[req.method][req.url.pathname];
        // console.log('handler', handler);
        // Execute Handler
        console.log(req.method, req.url.pathname);
        if (handler) {
          return handler(req, res);
        } else {
        // 404 if it's not there
          console.error('NOT_FOUND', req.url.pathname);
          res.writeHead(404);
          res.end();
        }
      })
      // Return a 400 if the request itself is invalid
      .catch((err) => {
        console.error('INVALID_REQUEST', err);
        res.writeHead(400);
        res.end();
      });
  }
};
   
  
   


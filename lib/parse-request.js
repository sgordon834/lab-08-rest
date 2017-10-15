'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {
    
  return new Promise((resolve, reject) => {
    
    // URL
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    
    if (! ( req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH' ) ) {
      return resolve(req);
    }
    
    let body = '';
    
    // Build up text as we read data
    req.on('data', (data) => {
      body += data.toString();
    });
    
    // JSONify it, if the request is for application/json
    // Handle errors
    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        resolve(req);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
    
    req.on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
};
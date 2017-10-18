'use strict';

process.env.PORT = 5500;
const server = require('../lib/server');
const superagent = require('superagent');
const expect = require('expect');

describe('api/notes lab', function() {

  beforeAll(() => {
    return server.start(process.env.PORT);
  });

  afterAll(() => {
    return server.stop();
  });

  describe ('POST /api/notes', () => {

    test('should respond with a 201', () => {
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send({
          title:'hello world',
          content: 'this is my first note'
        })
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body.title).toEqual('hello world');
          expect(res.body.content).toEqual('this is my first note');
        });
    });

    test('should respond with a 400 if a title is sent', () => {
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send({
          content: 'this is my first note'
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    test('should respond with 400 if content is not sent', () => {
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send({
          title: 'my title'
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    
  });
        
});

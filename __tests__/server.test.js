const GQLController = require('../server/controller/GQLcontroller');
const { main, linkparser, listDatabases, gimeData } = require('../models/dbRetriver');
const {MongoClient} = require('mongodb');
const mongo_url='mongodb+srv://alex:alex@cluster0.q9ag7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const request = require('supertest');
const express = require('express');
const app = express();
const server = 'http://localhost:3333';
import "babel-polyfill"
import 'regenerator-runtime/runtime';

// const server = 'http://localhost:3333';

// const app = require('./server') // Link to your server file
// const supertest = require('supertest')
// const request = supertest(app)


describe('database connection', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongo_url, {
      useNewUrlParser: true,
    });
    db = await connection.db("new_db");
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  }); 

  
  it('should insert a doc into collection', async () => {
    const users = db.collection('tasks');
    const randomNumber = Math.floor(Math.random() * 10000000);
    const mockUser = {_id: randomNumber, item: `test ${randomNumber}`};
    await users.insertOne(mockUser);
    
    const insertedUser = await users.findOne({_id: randomNumber});
    expect(insertedUser).toEqual(mockUser);
  });

});
  
// describe('Server Unit Tests', () => {
  

//     it('Testing post request for root endpoint', () => {
//       return request(app)
//         .post('/')
//         .send({URI: mongo_url})
//         .expect('Content-Type', /text\/html/)
//         .expect(200)
//     });

// });


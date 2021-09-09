const MongoClient = require('mongodb').MongoClient;
const dovenv = require('dotenv').config();
const path = require('path');
const MONGO_URL = process.env.mongo_url;
const fs = require('fs');
// modifies the link to be sent to the server
function linkparser(link) {
  const start = link.indexOf('net/');
  const end = link.indexOf('?');
  const res = link.slice(Number(start) + 4, end);
  return res;
}
// creates an array of database list to be rendered
async function listDatabases(client, dbName) {
  const output = [];
  databasesList = await client.db(dbName).listCollections({}).toArray();
  databasesList.forEach((l) => output.push(l.name));
  return output;
}
// retrieves the collections and tables from the database, and provides the type of value for each tables
async function retrieveData(client, result, dbName) {
  const outputArr = [];

  let obj = {};
  for (let i = 0; i < result.length; i++) {
    databasesList = await client.db(dbName).collection(result[i]).findOne({});
    outputArr.push(databasesList);
  }
  for (let i = 0; i < outputArr.length; i++) {
    for (el in outputArr[i]) {
      if (!Array.isArray(outputArr[i][el])) {
        const tester = JSON.stringify(outputArr[i][el]);
        if (tester.slice(1, 3) === '5d' && el !== '_id') {
          obj[el] = result[i];
        }
      }
      outputArr[i][el] = typeof outputArr[i][el];
    }
  }
  return outputArr;
}
// provides the collections and tables from the database, and use the function gimeData to sort through the result
async function main(req, res, next) {
  const client = new MongoClient(req.body.URI);
  try {
    await client.connect();
    const db_hook_name = await linkparser(req.body.URI);
    const result = await listDatabases(client, db_hook_name);
    res.locals.db_tables = result;
    res.locals.db_data = await retrieveData(client, result, db_hook_name);
    return next();
  } catch (e) {
  } finally {
    await client.close();
  }
}

module.exports = { main, linkparser, listDatabases, retrieveData };

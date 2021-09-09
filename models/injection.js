const path = require('path');
const console = require('console');
const MongoClient = require('mongodb').MongoClient;
const schemaFactory = require('../server/GQLfactory/schema.js');
const type = require('../server/GQLfactory/types.js');
const fs = require('fs');

// modifies the input URI to be sent to the server
function linkparser(link) {
  const start = link.indexOf('net/');
  const end = link.indexOf('?');
  const res = link.slice(Number(start) + 4, end);
  return res;
}

const top = `const express = require('express');
const path = require('path');
const PORT = 3200;
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const MongoClient = require('mongodb').MongoClient;
const app = express();
let textsT;
let conn;
const mongoose = require('mongoose');
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLSchema} = graphql;`;
/* 
top var is here and always be the same string of things that we
would need absolutely every time for server file that being generated
*/

function main(dbName, link) {
  str = ` 
 async function main(){
  try {
    await mongoose.connect("${link}",
       { useNewUrlParser: true, useUnifiedTopology: true, dbName: "${dbName}"})
        console.log("DB_connection is stable");
         conn = await mongoose.connection.db;
      
    } catch (e) {
      console.error(e);
  } 
}`;

  return str;
}
/* 
main function in a new server file is needed to establish a connection within mongoose methods to DB
*/

async function listDatabases(client, dbName) {
  const output = [];
  databasesList = await client.db(dbName).listCollections({}).toArray();
  databasesList.forEach((l) => output.push(l.name));
  return output;
}
async function retrieveData(client, result, dbName) {
  const outputArr = [];

  let obj = {};
  for (let i = 0; i < result.length; i++) {
    databasesList = await client.db(dbName).collection(result[i]).findOne({});
    outputArr.push(databasesList);
  }
  for (let i = 0; i < outputArr.length; i++) {
    // console.log(outputArr[i])
    for (el in outputArr[i]) {
      if (!Array.isArray(outputArr[i][el])) {
        outputArr[i][el] = typeof outputArr[i][el];
      }
      //   console.log(obj);
    }
  }
  return outputArr;
}
/*
listDatabases and gimeData accordingly gives the user an array of all collection names as an array and
gimeData creates a data dump from all fields and types from each collection
*/
//.collection('texts')
const mainR = ` 
main(); 
`;
// invocation of the main function is necessary to initiate a connection to a DB
const finder = `const findOne = async (args, conn)=>{
  let outputer;
      const result = await conn.find({}).toArray();
      for(let i=0; i< result.length; i++){
        if(result[i]._id == args._id){
              outputer =  result[i];
        }
    }
return outputer;
}`;
/* finder is here as a var to utilize logic of FindOne in mango DB,
   but unfortunately mongoose for some reason don't want to retrieve only one element,
   so we as a team had to come up with a simple way to retrieve that data
*/
const createFindAllTables = (tableName) => {
  let str = '';
  str += ` ${tableName.toLowerCase()} :
   {type:new GraphQLList(${tableName}),
    resolve: async (parent, args)=>
    {const result = await conn.collection("${tableName}").find({}).toArray(); return result;}}, `;
  str += ` ${tableName.toLowerCase()}FindById : 
  {type:${tableName}, args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer = await findOne(args, conn.collection("${tableName}"));
   return outputer;}}`;
  return str;
};

/*
 createFindAllTables function is actually merging two different GraphQl resolvers to find all the 
 fields in tables and find by id on specific table entry. 
 Nobody probably would read this but in case you are - have some fun, 
 this project was a pure pleasure to work on, sharing wisdom - don't stress it over just slowly 
 accustom urself to work with your team on solving problems that is the whole point of this!!
 Qleksii forever!
*/

const createSimpletype = (tableName, tableFields) => {
  let str = '';
  // if(tableFields===null) return 'no fields were identified'
  str += `
   const ${tableName} = new GraphQLObjectType({  name:'${tableName}', 
  fields:() =>({`;
  for (let el in tableFields) {
    if (el === '__v') {
      continue;
    }
    str += el + ':{type:' + type(tableFields[el]) + '}, '; //needs to be typing
  }
  str += '})});';
  return str;
};
/*
createSimpletype is a function that generates types of each collection so we know what fields
exist in that collection and what types are they.
*/

const end = ` 
const newRunner = new GraphQLSchema({query:RootQuery});
app.use('/graphql', graphqlHTTP({
  schema: newRunner,
  graphiql: true,
}));`;
/*
end is actually an ending part of server file that is being generated
*/

const listen = `
app.listen(PORT, () => {console.log('listening on port 3200');
})`;
/*
at this point we need a listener for server file! 
*/
const buildServerFile = async (req, res, next) => {
  const client = new MongoClient(req.body.URI);
  try {
    await client.connect();

    const dbName = linkparser(req.body.URI);

    const tables = await listDatabases(client, dbName);

    const fields = await retrieveData(client, tables, dbName);

    let Resolvers = ` 
    const RootQuery = new GraphQLObjectType({name:'Query', fields:{ `;
    const tail = `} });`;
    let result = '';
    result += top;

    result += main(dbName, req.body.URI);

    result += mainR;

    result += finder;

    tables.forEach((l, i) => (result += createSimpletype(l, fields[i])));

    result += Resolvers;

    tables.forEach((l) => {
      if (
        result.slice(result.length - 9, result.length) ===
        'fields:{ '
      )
        result += createFindAllTables(l);
      else {
        result += ',';
        result += createFindAllTables(l);
      }
    });
    result += tail;

    result += end;

    result += listen;
    await fs.writeFile(
      './remoteserver/server.js',
      result,
      function (err) {
        if (err) return console.log(err);
      }
    );
    return next();
  } catch (e) {
    //console.error(e);
    return next(e);
  } finally {
    await client.close();
  }
};
/*
gBuild is where all logic for outputting the whole server file together.

*/

module.exports = buildServerFile;

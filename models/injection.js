const path = require('path');
const console = require('console');
const MongoClient = require('mongodb').MongoClient;
const schemaFactory = require('../server/GQLfactory/schema.js');
const type = require('../server/GQLfactory/types.js');
fs = require('fs');
let bigAssResult ='';

function linkparser(link){
    const start = link.indexOf('net/');
    const end = link.indexOf('?');
    const res = link.slice(Number(start)+4, end)
    return res;
}

// fetch("http://localhost:3333/injection", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({URI:change}),
// }).catch(error => console.log('Error', error));
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
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLSchema} = graphql;`



function main(dbName, link){
 str=` 
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

async function listDatabases(client, dbName){
  const output = [];
  databasesList = await client.db(dbName).listCollections({}).toArray();
  databasesList.forEach(l => output.push(l.name));
  return output

};
async function gimeData(client, result, dbName){
  const outputArr = [];

  let obj ={};
  for(let i=0; i<result.length; i++){
   databasesList = await client.db(dbName).collection(result[i]).findOne({});  
   outputArr.push(databasesList);

  }
  for(let i=0; i<outputArr.length; i++){
      // console.log(outputArr[i])
      for(el in outputArr[i]){
          if(!Array.isArray(outputArr[i][el])){
            
       outputArr[i][el] = typeof outputArr[i][el] 
      }
  //   console.log(obj);
  }}
 return outputArr 
};

//.collection('texts')
const mainR = ` 
main(); 
`;

const finder =`const findOne = async (args, conn)=>{
  let outputer;
      const result = await conn.find({}).toArray();
      for(let i=0; i< result.length; i++){
        if(result[i]._id == args.id){
              outputer =  result[i];
        }
    }
return outputer;
}`;

const createFindAllTables = (tableName) => {
  let str ='';
   str += ` ${tableName.toLowerCase()} :
   {type:new GraphQLList(${tableName}),
    resolve: async (parent, args)=>
    {const result = await conn.collection("${tableName}").find({}).toArray(); return result;}}, `;
  str += ` ${tableName.toLowerCase()}FindById : 
  {type:new GraphQLList(${tableName}),args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer =  findOne(args, conn.collection("${tableName}"));
   return outputer;}}`; 
  return str;
};

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


const end = ` 
const newRunner = new GraphQLSchema({query:RootQuery});
app.use('/graphql', graphqlHTTP({
  schema: newRunner,
  graphiql: true,
}));`;




const listen = `
app.listen(PORT, () => {console.log('listening on port 3200');
})`;



 const gBuild=async (req, res, next)=>{
  const client = new MongoClient(req.body.URI);
  try {
   await client.connect();

   const dbName = linkparser(req.body.URI);
   
   const tables = await listDatabases(client, dbName);
    
   const fields = await gimeData(client, tables, dbName);

    let Resolvers = ` 
    const RootQuery = new GraphQLObjectType({name:'Query', fields:{ `
    const tail = `} });`;
    
   bigAssResult += top;

   bigAssResult += main(dbName, req.body.URI);

   bigAssResult += mainR;

   bigAssResult += finder;

   tables.forEach((l, i)=> bigAssResult += createSimpletype(l, fields[i]));    
   

   bigAssResult += Resolvers;

   tables.forEach(l=>{ 
     if(bigAssResult.slice(bigAssResult.length-9, bigAssResult.length)==="fields:{ ")
   bigAssResult += createFindAllTables(l);
  else{
    bigAssResult +=",";
    bigAssResult += createFindAllTables(l);
  }
  
  }); 
   bigAssResult += tail;  

   bigAssResult += end;

   bigAssResult += listen;
  
   
  
  return next();
} 
 catch (e) {
    //console.error(e);
} finally {
    await client.close();
    fs.writeFile('./remoteserver/server.js', bigAssResult,  function (err) {
      if (err) return console.log(err);
    });
  }

    // console.log(here)
 
   }
  


  // injection.gBuild()



module.exports = gBuild;

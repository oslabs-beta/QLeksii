const MongoClient = require('mongodb').MongoClient;
const dovenv = require('dotenv').config();


const MONGO_URL = process.env.mongo_url;
function linkparser(link){
    const start = link.indexOf('net/');
    const end = link.indexOf('?');
    const res = link.slice(Number(start)+4, end)
    return res;
}

async function listDatabases(client, dbName){
    const output = [];
    databasesList = await client.db(dbName).listCollections({}).toArray();
    databasesList.forEach(l => output.push(l.name));
    return output

};
async function gimeData(client, result, dbName){
    const outputArr = [];
    for(let i=0; i<result.length; i++){
     databasesList = await client.db(dbName).collection(result[i]).findOne({});  
     outputArr.push(databasesList);
    }
    for(let i=0; i<outputArr.length; i++){
        for(el in outputArr[i]){
         outputArr[i][el] = typeof outputArr[i][el] 
        }
       
    }
   return outputArr
};

async function main(req, res, next){
    const uri = MONGO_URL;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db_hook_name = await linkparser(MONGO_URL);
        const result = await listDatabases(client, db_hook_name);
        res.locals.db_tables = result;
        res.locals.db_data = await  gimeData(client, result, db_hook_name);
           return next();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = main;


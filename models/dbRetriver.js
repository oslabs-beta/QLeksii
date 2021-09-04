const MongoClient = require('mongodb').MongoClient;
const dovenv = require('dotenv').config();
const path = require('path');
const MONGO_URL = process.env.mongo_url;
const fs = require('fs');

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
 
    let obj ={};
    for(let i=0; i<result.length; i++){
     databasesList = await client.db(dbName).collection(result[i]).findOne({});  
     outputArr.push(databasesList);
 
    }
    for(let i=0; i<outputArr.length; i++){
        // console.log(outputArr[i])
        for(el in outputArr[i]){
            if(!Array.isArray(outputArr[i][el])){
                const tester =JSON.stringify(outputArr[i][el]);
                if(tester.slice(1, 3) === "5d" && el !=='_id' ){
                 
                 obj[el] =result[i];
            
                         
                }
            }
         outputArr[i][el] = typeof outputArr[i][el] 
        }
    //   console.log(obj);
    }
   return outputArr 
};

async function main(req, res, next){
    // const uri = MONGO_URL;
    // console.log('body',req.body.URI);
    const client = new MongoClient(req.body.URI);
    try {
        await client.connect();
        const db_hook_name = await linkparser(req.body.URI);
        const result = await listDatabases(client, db_hook_name);
        res.locals.db_tables = result;
        res.locals.db_data = await gimeData(client, result, db_hook_name);
        //  console.log(outer);
        return next();
    } catch (e) {
        //console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = {main, linkparser, listDatabases, gimeData};


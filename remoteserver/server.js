const express = require('express');
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
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLSchema} = graphql; 
 async function main(){
  try {
    await mongoose.connect("mongodb+srv://alex:alex@cluster0.q9ag7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
       { useNewUrlParser: true, useUnifiedTopology: true, dbName: "myFirstDatabase"})
        console.log("DB_connection is stable");
         conn = await mongoose.connection.db;
      
    } catch (e) {
      console.error(e);
  } 
} 
main(); 
const findOne = async (args, conn)=>{
  let outputer;
      const result = await conn.find({}).toArray();
      for(let i=0; i< result.length; i++){
        if(result[i]._id == args.id){
              outputer =  result[i];
        }
    }
return outputer;
}
   const texts = new GraphQLObjectType({  name:'texts', 
  fields:() =>({_id:{type:GraphQLString}, text:{type:GraphQLString}, NPI_ID:{type:GraphQLString}, CIN_ID:{type:GraphQLString}, createdAt:{type:GraphQLString}, })});
   const users = new GraphQLObjectType({  name:'users', 
  fields:() =>({_id:{type:GraphQLString}, mainPicture:{type:GraphQLString}, title:{type:GraphQLString}, firstName:{type:GraphQLString}, lastName:{type:GraphQLString}, DOB:{type:GraphQLString}, state:{type:GraphQLString}, city:{type:GraphQLString}, address:{type:GraphQLString}, CIN_ID:{type:GraphQLString}, email:{type:GraphQLString}, password:{type:GraphQLString}, })});
   const doctors = new GraphQLObjectType({  name:'doctors', 
  fields:() =>({_id:{type:GraphQLString}, mainPicture:{type:GraphQLString}, uffix:{type:GraphQLString}, firstName:{type:GraphQLString}, lastName:{type:GraphQLString}, speciality:{type:GraphQLString}, NPI_ID:{type:GraphQLString}, email:{type:GraphQLString}, password:{type:GraphQLString}, City:{type:GraphQLString}, })});
   const sessions = new GraphQLObjectType({  name:'sessions', 
  fields:() =>({_id:{type:GraphQLString}, UserName:{type:GraphQLString}, WhenLoggedIn:{type:GraphQLString}, Expiration:{type:GraphQLString}, })}); 
    const RootQuery = new GraphQLObjectType({name:'Query', fields:{  texts :
   {type:new GraphQLList(texts),
    resolve: async (parent, args)=>
    {const result = await conn.collection("texts").find({}).toArray(); return result;}},  textsFindById : 
  {type:new GraphQLList(texts),args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer =  findOne(args, conn.collection("texts"));
   return outputer;}}, users :
   {type:new GraphQLList(users),
    resolve: async (parent, args)=>
    {const result = await conn.collection("users").find({}).toArray(); return result;}},  usersFindById : 
  {type:new GraphQLList(users),args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer =  findOne(args, conn.collection("users"));
   return outputer;}}, doctors :
   {type:new GraphQLList(doctors),
    resolve: async (parent, args)=>
    {const result = await conn.collection("doctors").find({}).toArray(); return result;}},  doctorsFindById : 
  {type:new GraphQLList(doctors),args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer =  findOne(args, conn.collection("doctors"));
   return outputer;}}, sessions :
   {type:new GraphQLList(sessions),
    resolve: async (parent, args)=>
    {const result = await conn.collection("sessions").find({}).toArray(); return result;}},  sessionsFindById : 
  {type:new GraphQLList(sessions),args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer =  findOne(args, conn.collection("sessions"));
   return outputer;}}} }); 
const newRunner = new GraphQLSchema({query:RootQuery});
app.use('/graphql', graphqlHTTP({
  schema: newRunner,
  graphiql: true,
}));
app.listen(PORT, () => {console.log('listening on port 3200');
})
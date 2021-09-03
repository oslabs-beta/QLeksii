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
    await mongoose.connect("mongodb+srv://damien:Codesmith@cluster0.prul2.mongodb.net/starwars?retryWrites=true&w=majority",
       { useNewUrlParser: true, useUnifiedTopology: true, dbName: "starwars"})
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
        if(result[i]._id == args._id){
              outputer =  result[i];
        }
    }
return outputer;
}
   const films = new GraphQLObjectType({  name:'films', 
  fields:() =>({_id:{type:GraphQLString}, title:{type:GraphQLString}, episode_id:{type:GraphQLString}, opening_crawl:{type:GraphQLString}, director:{type:GraphQLString}, producer:{type:GraphQLString}, release_date:{type:GraphQLString}, })});
   const species = new GraphQLObjectType({  name:'species', 
  fields:() =>({_id:{type:GraphQLString}, name:{type:GraphQLString}, classification:{type:GraphQLString}, average_height:{type:GraphQLString}, average_lifespan:{type:GraphQLString}, hair_colors:{type:GraphQLString}, skin_colors:{type:GraphQLString}, language:{type:GraphQLString}, homeworld:{type:GraphQLString}, homeworld_id:{type:GraphQLString}, })});
   const planets = new GraphQLObjectType({  name:'planets', 
  fields:() =>({_id:{type:GraphQLString}, name:{type:GraphQLString}, rotation_period:{type:GraphQLString}, orbital_period:{type:GraphQLString}, diameter:{type:GraphQLString}, climate:{type:GraphQLString}, gravity:{type:GraphQLString}, terrain:{type:GraphQLString}, surface_water:{type:GraphQLString}, population:{type:GraphQLString}, })});
   const people = new GraphQLObjectType({  name:'people', 
  fields:() =>({_id:{type:GraphQLString}, name:{type:GraphQLString}, mass:{type:GraphQLString}, hair_color:{type:GraphQLString}, skin_color:{type:GraphQLString}, eye_color:{type:GraphQLString}, birth_year:{type:GraphQLString}, gender:{type:GraphQLString}, species:{type:GraphQLString}, homeworld:{type:GraphQLString}, height:{type:GraphQLString}, homeworld_id:{type:GraphQLString}, species_id:{type:GraphQLString}, films:{type:GraphQLString}, })}); 
    const RootQuery = new GraphQLObjectType({name:'Query', fields:{  films :
   {type:new GraphQLList(films),
    resolve: async (parent, args)=>
    {const result = await conn.collection("films").find({}).toArray(); return result;}},  filmsFindById : 
  {type:films, args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer = await findOne(args, conn.collection("films"));
   return outputer;}}, species :
   {type:new GraphQLList(species),
    resolve: async (parent, args)=>
    {const result = await conn.collection("species").find({}).toArray(); return result;}},  speciesFindById : 
  {type:species, args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer = await findOne(args, conn.collection("species"));
   return outputer;}}, planets :
   {type:new GraphQLList(planets),
    resolve: async (parent, args)=>
    {const result = await conn.collection("planets").find({}).toArray(); return result;}},  planetsFindById : 
  {type:planets, args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer = await findOne(args, conn.collection("planets"));
   return outputer;}}, people :
   {type:new GraphQLList(people),
    resolve: async (parent, args)=>
    {const result = await conn.collection("people").find({}).toArray(); return result;}},  peopleFindById : 
  {type:people, args: {_id:{type : GraphQLString}},  
   resolve: async (parent, args) => { const outputer = await findOne(args, conn.collection("people"));
   return outputer;}}} }); 
const newRunner = new GraphQLSchema({query:RootQuery});
app.use('/graphql', graphqlHTTP({
  schema: newRunner,
  graphiql: true,
}));
app.listen(PORT, () => {console.log('listening on port 3200');
})
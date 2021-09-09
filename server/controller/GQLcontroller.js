const schemaFactory = require('../GQLfactory/schema');
const fs = require('fs');
const GQLController = {};

/*  GQL Controller.createGQLSchema is a
    function  that uses other methods and functions 
    and generates the final results for Graphql queries
    and resolvers before it is being outputted in a side window in an app.
    here we have Resolvers, Mutations, Queries, Types!
*/

GQLController.createGQLSchema = (req, res, next) => {
  const fields = res.locals.db_data;
  const tables = res.locals.db_tables;
  try {
    const Types = [];
    let Resolvers = `const RootQuery = new GraphQLObjectType({
      name:'Query',
      fields:{ 
         `;
    let Mutations = `const Mutation = new GraphQLObjectType({
      name:'Mutation',
      fields:{
        `;
    let Query = `type Query {
      `;
    let Mutation = `type Mutation {
      `;
    for (let i = 0; i < tables.length; i++) {
      const types = schemaFactory.createSimpletype(tables[i], fields[i]);
      Types.push(types);
      const resolvers =
        schemaFactory.createFindAllTables(tables[i]) +
        schemaFactory.createSearchById(tables[i]);
      Resolvers += resolvers;
      const mutations =
        schemaFactory.createAddByTable(tables[i]) +
        schemaFactory.createUpdateByTable(tables[i]) +
        schemaFactory.createDeleteByTable(tables[i]);
      Mutations += mutations;
      Query += schemaFactory.createSimpleQuery(tables[i]);
      Mutation += schemaFactory.createSimpleMutation(tables[i], fields[i]);
    }
    const tail = `}
  }
  );`;
    Resolvers += tail;
    Mutations += tail;
    Query += `}`;
    Mutation += '}';
    res.locals.GQLSchema = { Types, Resolvers, Mutations, Query, Mutation };
    return next();
  } catch (err) {
    const errObject = {
      log: `Error in createGQLSchema: ${err}`,
      status: 400,
      message: {
        err: 'Unable to create GQL schema',
      },
    };
    return next(errObject);
  }
};
/*  GQL Controller.pushToFile is actually a
    function that in the early stages of development would give
    people an ability to export all generated data to file
*/
GQLController.pushToFile = (req, res, next) => {
  try {
    fs.writeFile(
      'outputer.txt',
      JSON.stringify(res.locals.GQLSchema),
      function (err) {
        if (err) return console.log(err);
      }
    );
    return next();
  } catch (err) {
    const errObject = {
      log: `Error in createGQLSchema: ${err}`,
      status: 400,
      message: {
        err: 'Unable to push to file',
      },
    };
    return next(errObject);
  }
};

module.exports = GQLController;

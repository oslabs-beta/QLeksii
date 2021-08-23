const schemaFactory = require('../GQLfactory/schema');
fs = require('fs');
const GQLController = {};

GQLController.createGQLSchema = (req, res, next) => {
  const fields = res.locals.db_data;
  const tables = res.locals.db_tables;
  try {
    const Types = [];
    let Resolvers = `const RootQuery = new GraphQLObjectType({name:'Query', fields:{ `;
    let Mutations = `const Mutation = new GraphQLObjectType({name:'Mutation', fields:{`;
    for (let i = 0; i < tables.length; i++) {
      const types = schemaFactory.createSimpletype(tables[i], fields[i]);
      Types.push(types);
      const resolvers = schemaFactory.createFindAllTables(tables[i]);
      Resolvers += resolvers;
      const mutations =
        schemaFactory.createAddByTable(tables[i]) +
        schemaFactory.createUpdateByTable(tables[i]) +
        schemaFactory.createDeleteByTable(tables[i]);
      Mutations += mutations;
    }
    const tail = `} });`;
    Resolvers += tail;
    Mutations += tail;
    res.locals.GQLSchema = { Types, Resolvers, Mutations };
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
<<<<<<< HEAD


GQLController.pushToFile=(req, res, next)=>{
=======
GQLController.pushToFile = (req, res, next) => {
>>>>>>> development
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

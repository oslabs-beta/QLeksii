const schemaFactory = require('../GQLfactory/schema')
fs = require('fs');
const GQLController = {};

GQLController.createGQLSchema = (req, res, next) => {
  const fields = res.locals.db_data;
   const tables = res.locals.db_tables;
  try {
    const Types = [];
    const Resolvers = [];
    for(let i=0; i< tables.length; i++){
      const types = schemaFactory.createSimpletype(tables[i], fields[i]);
       Types.push(types);
      const resolvers = schemaFactory.createResolveAllTable(tables[i]);
      Resolvers.push(resolvers)
    }
    res.locals.GQLSchema = {  Types, Resolvers };
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
GQLController.pushToFile=(req, res, next)=>{
  try {
        fs.writeFile('outputer.txt', JSON.stringify(res.locals.GQLSchema), function (err) {
           if (err) return console.log(err);
      });
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
}

module.exports = GQLController;

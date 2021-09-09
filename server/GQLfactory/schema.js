const type = require('./types');
// generates Schema to be used for queries, mutations, etc
const schemaFactory = {};
schemaFactory.createSimpletype = (tableName, tableFields) => {
  let str = '';

  str += `const ${tableName} = new GraphQLObjectType({
    name:'${tableName}', 
    fields:() =>({
      `;

  for (let el in tableFields) {
    if (el === '__v') {
      continue;
    }
    str +=
      el +
      `:{type: ${type(tableFields[el])} },
    `;
  }
  str += `})
});`;
  return str;
};
// creates a Schema for generating queries
schemaFactory.createSimpleQuery = (tableName) => {
  let str = ``;
  str += `${tableName}:[${tableName}!]!,
  `;
  str += `${tableName.toLowerCase()}FindById(_id: ID!): ${tableName},
  `;
  return str;
};

// creates a Schema for generating mutations
schemaFactory.createSimpleMutation = (tableName, tableFields) => {
  let str = ``;
  let schema = ``;
  for (let field in tableFields) {
    if (field === '__v' || field === '_id') {
      continue;
    }
    schema += `${field} : ${tableFields[field]},
    `;
  }
  str += `update${tableName.toLowerCase()}ByID(_id: ID!, update:{${schema}}) : ${tableName}!,
  `;
  str += `delete${tableName.toLowerCase()}ByID(_id: ID!) : ${tableName}!,
  `;
  str += `add${tableName.toLowerCase()}ByID(_id: ID!, insert{${schema}}) : ${tableName}!,
  `;
  return str;
};

// create Schema that will find all existing tables in the database
schemaFactory.createFindAllTables = (tableName) => {
  let str = ` ${tableName.toLowerCase()} : {
    type:new GraphQLList(${tableName}),
    resolve(parent, args){
      return ${tableName}.find({});
    }
  },
  `;
  return str;
};

// create Schema that will search specific tables by field
schemaFactory.createSearchByField = (tableName, checkbox) => {
  let str = ``;
  const fields = Object.keys(checkbox);
  fields.forEach((field) => {
    str += checkbox[field]
      ? `${tableName.toLowerCase()}By${field} : {type : ${tableName}, args : {${field}:{type : ${type(
          checkbox[field]
        )}}}, resolve(parent, args){return ${tableName}.findOne({${field}:args.${field}})}},`
      : ``;
  });
  return str;
};
// create Schema that will enable user to search using object ID
schemaFactory.createSearchById = (tableName) => {
  let str = ` ${tableName.toLowerCase()}FindById : {
    type: ${tableName},
    args: {_id:{type : GraphQLString}},
    resolve(parent, args){
      return ${tableName}.findOne({_id:args._id});
    }
  },
  `;
  return str;
};
// create Schema that will delete tables
schemaFactory.createDeleteByTable = (tableName) => {
  let str = `delete${tableName.toLowerCase()}ByID : {
    type : ${tableName},
    args : {_id:{type : GraphQLString}},
    resolve(parent, args){
      return ${tableName}.deleteOne({_id:args._id});
    }
  },
  `;
  return str;
};
// create schema that will update tables
schemaFactory.createUpdateByTable = (tableName) => {
  let str = `update${tableName.toLowerCase()}ByID :{
    type : ${tableName},
    args : {_id:{type : GraphQLString}, update:{type : GraphQLObjectType}},
    resolve(parent, args){
      return ${tableName}.updateOne({_id:args._id}, args.update);
    }
  },
  `;
  return str;
};
// create schema that will add entries to tables
schemaFactory.createAddByTable = (tableName) => {
  let str = `add${tableName.toLowerCase()}ByID :{
    type : ${tableName},
    args : {insert:{type : GraphQLObjectType}},
    resolve(parent, args){
       return ${tableName}.create(args.insert);
      }
    },
    `;
  return str;
};

module.exports = schemaFactory;

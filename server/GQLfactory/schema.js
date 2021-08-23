const type = require('./types');

const schemaFactory = {};
// tail = `} });`
// queryHead = `const RootQuery = new GraphQLObjectType({name:'Query', fields:{ `
// mutationHead = `const Mutation = new GraphQLObjectType({name:'Mutation', fields{`
schemaFactory.createSimpletype = (tableName, tableFields) => {
  let str = '';
  // if(tableFields===null) return 'no fields were identified'
  str += `const ${tableName} = new GraphQLObjectType({ name:'${tableName}', fields:() =>({`;
  for (let el in tableFields) {
    if (el === '__v') {
      continue;
    }
    str += el + ':{type:' + type(tableFields[el]) + '}, ';
  }
  str += '})});';
  return str;
};

schemaFactory.createFindAllTables = (tableName) => {
  let str = `${tableName.toLowerCase()} : {type:new GraphQLList(${tableName}),resolve(parent, args){return ${tableName}.find({});}}`;
  // str += `const RootQueryFor${tableName} = new GraphQLObjectType({ name:'Query',`;
  // str += `fields:{ '${tableName.toLowerCase()}' :{  type:new GraphQLList(${tableName}),`;
  // str += `resolve(parent, args){ return ${tableName}.find({});}`;

  return str;
};

schemaFactory.createSearchByField = (tableName, checkbox) => {
  let str = ``;
  const fields = Object.keys(checkbox);
  fields.forEach((field) => {
    str += checkbox[field]
      ? `${tableName.toLowerCase()}By${field} : {type : ${tableName}, args : {${field}:{type : ${type(
          checkbox[field]
        )}}}, resolve(parent, args){return ${tableName}.findOne({${field}:args.${field}})}}`
      : ``;
  });
  return str;
};
schemaFactory.createDeleteByTable = (tableName) => {
  let str = `delete${tableName.toLowerCase()}ByID : {type : ${tableName}, args : {_id:{type : GraphQLString}}, resolve(parent, args){return ${tableName}.deleteOne({_id:args._id})}}`;
  return str;
};

schemaFactory.createUpdateByTable = (tableName) => {
  let str = `update${tableName.toLowerCase()}ByID : {type : ${tableName},args : {_id:{type : GraphQLString}, update:{type : GraphQLObjectType}},resolve(parent, args){return ${tableName}.updateOne({_id:args._id}, args.update)}}`;
  return str;
};

schemaFactory.createAddByTable = (tableName) => {
  let str = `add${tableName.toLowerCase()}ByID : {type : ${tableName},args : {insert:{type : GraphQLObjectType}},resolve(parent, args){return ${tableName}.create(args.insert)}}`;
  return str;
};

// console.log(schemaFactory.createResolveAllTable("User"))

module.exports = schemaFactory;

// const MutationFortasks = new GraphQLObjectType({
//   name:'Mutation',
//   fields{
//   addtask:{
//       type: Tasks,
//        args:{
//         item:{type: GraphQLString},
//all table fields must be discribed
//          resolve(parent, args){
//        return Task.create({item:args.item});
//       },
//
// }
//
//
//
//

//     }
//     }
//   });

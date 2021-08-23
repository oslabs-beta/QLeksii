const type = require('./types');

const schemaFactory = {}


schemaFactory.createSimpletype=(tableName, tableFields)=>{
let str ='';
// if(tableFields===null) return 'no fields were identified'
        str+=(`const ${tableName} = new GraphQLObjectType({ name:'${tableName}', fields:() =>({`);
        for(let el in tableFields){
        if(el === "__v"){
         continue    
        }    
        str+=(el+":{type:"+type(tableFields[el])+"}, ");
        }
        str+=('})});');
return str
}
schemaFactory.createResolveAllTable=(tableName)=>{
let str ='';
        str+=(`const RootQueryFor${tableName} = new GraphQLObjectType({ name:'Query',`);
        str+= (`fields:{ '${tableName.toLowerCase()}' :{  type:new GraphQLList(${tableName}),`);
        str+=(`resolve(parent, args){ return ${tableName}.find({});}}} });`);
return str
}


// console.log(schemaFactory.createResolveAllTable("User"))




module.exports = schemaFactory;



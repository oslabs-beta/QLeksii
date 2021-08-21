const type = require('./types');

const schemaFactory = {}


schemaFactory.createSimpletype=(tableName, tableFields)=>{
let str ='';
// if(tableFields===null) return 'no fields were identified'
str+=('const '+ tableName +' = new GraphQLObjectType({ name:'+tableName+'}, fields:() =>({');
        for(let el in tableFields){
        str+=(el+":{type:"+type(tableFields[el])+"}, ");
        }
        str+=('})});');
return str
}
schemaFactory.createResolveAllTable=(tableName)=>{
let str ='';
        str+=('const RootQueryfor'+tableName+' = new GraphQLObjectType({ name:Query,fields:{ '+tableName.toLowerCase()+' :{  type:new GraphQLList('+tableName+'),'+
        ' resolve(parent, args){ return '+tableName+'.find({});}}} });');
return str
}


// console.log(schemaFactory.createResolveAllTable("User"))




module.exports = schemaFactory;





const type = (str) => {
  switch (str) {
   case 'array':
      return 'GraphQLList';
    case 'object':
      return 'GraphQLString';
    case 'string':
      return 'GraphQLString';
    case 'number':
      return 'GraphQLInt';
    default:
      return 'GraphQLString';
  }
};

module.exports =type;

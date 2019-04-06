var resolvers=require('./resolvers')

var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    usuario: User
  }
  type User{
    id:String
    name:String
    lastname:String
  }
`);


module.exports=schema

var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    usuario(name:String,pwd:String): Usuario
  }
  type Usuario{
    _id:String
    name:String
    token: String
    }
   `);


module.exports=schema

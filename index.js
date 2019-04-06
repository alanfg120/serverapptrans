var express = require('express');
var cors = require('cors');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var router = require("./rest/rest");
var graphqlHTTP = require('express-graphql');
var jwtClave="adsgkgsf";
var  schema =require('./schema')
var  resolves=require('./resolvers')
var app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json())
app.use(expressJwt({secret:jwtClave}).unless({path: ["/login","/graphql"]}));
app.use(router);

app.use('/graphql',graphqlHTTP({
   graphiql: true,
   rootValue: resolves,
   schema:schema
}));

 


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

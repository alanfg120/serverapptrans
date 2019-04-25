var express = require('express');
var cors = require('cors');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var graphqlHTTP = require('express-graphql');
var jwtClave="alan";
var  schema =require('./schema')
var  resolves=require('./resolvers')
var app = express();

 var router = require("./rest");

app.use(cors());
//app.use(express.static('Documentos'));
app.use(express.urlencoded());
app.use(express.json())
app.use(expressJwt({secret:jwtClave}).unless({path: ["/login","/upload","/conductor"]}));
app.use( (err, req, res, next)=> {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No Autorizado');
  }
});
app.use(router);
app.use('/graphql',graphqlHTTP({
   graphiql: true,
   rootValue: resolves,
   schema:schema
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

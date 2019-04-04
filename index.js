var express = require('express');
var cors = require('cors');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var router = require("./rest/rest");

var jwtClave="adsgkgsf";
var app = express();



app.use(cors());
app.use(express.urlencoded());
app.use(express.json())
app.use(expressJwt({secret:jwtClave}).unless({path: ["/login"]}));
app.use(router);



 


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var express = require('express');
var cors = require('cors');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var jwtClave="alan";
var app = express();
var conductor = require("./rutas/conductor");
var usuario=require("./rutas/usuarios")
var contrato=require("./rutas/contrato")
var vehiculo=require("./rutas/vehiculo")
var trailer=require("./rutas/trailer")
app.use(cors());
app.use(express.static(__dirname + '/dist'));
app.use('/asset', express.static(__dirname + '/static'));
app.use(express.urlencoded());
app.use(express.json())
app.use(expressJwt({secret:jwtClave}).unless({path: ["/usuario/login","/dist"]}));
app.use( (err, req, res, next)=> {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});
app.use('/conductor',conductor);
app.use('/usuario',usuario);
app.use('/contrato',contrato);
app.use('/vehiculo',vehiculo);
app.use('/trailer',trailer);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxhbmZnMTIwQGdtYWlsLmNvbSIsImlhdCI6MTU1ODA0NDYzNH0.SxfUBnyV9Tpl8gQy0EM7KCOHLT-3q5BtB-BF48qXl1Q
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

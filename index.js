var express = require('express');
var cors = require('cors');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var graphqlHTTP = require('express-graphql');
var jwtClave="alan";
var  schema =require('./schema')
var  resolves=require('./resolvers')
var app = express();
const fileUpload = require('express-fileupload');

app.use(cors());

app.use(express.urlencoded());
app.use(express.json())
app.use(expressJwt({secret:jwtClave}).unless({path: ["/login","/upload","/conductor"]}));
app.use( (err, req, res, next)=> {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No Autorizado');
  }
});

app.use('/graphql',graphqlHTTP({
   graphiql: true,
   rootValue: resolves,
   schema:schema
}));

app.get('/login',(req,res)=>{
var token=jwt.sign({ name: 'alan' }, jwtClave)
console.log(token);
res.send("listo")
})

app.post('/upload',fileUpload(),(req,res)=>{
Object.values(req.files).forEach(file => {
    console.log(file.name);
    file.mv('Documentos/Conductores/'+ file.name,(err)=>{})
  });
  res.send({status:"ok"})
})

app.post('/conductor',(req,res)=>{

  console.log(req.body);
  res.send(req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

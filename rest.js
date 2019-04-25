const router = require("express").Router();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";
const fileUpload = require("express-fileupload");
const fs = require("fs").promises;

async function mkdir(dirpath) {
  try {
    await fs.mkdir(dirpath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

router.get("/login", (req, res) => {
  var token = jwt.sign({ name: "alan" }, jwtClave);
  console.log(token);
  res.send("listo");
});

router.post("/upload", fileUpload(), (req, res) => {
  console.log(req.body);
  
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores")
      .find({ cedula: req.body.cedulaname })
      .count()
      .then(async c => {
        console.log(c);
        
        if (c==0) {
          try {
            await mkdir(`Documentos/Conductores/${req.body.cedulaname}`);
            console.log("listo");
          } catch (err) {
            console.log(err);
          }
          Object.values(req.files).forEach(file => {
            file.mv(
              `Documentos/Conductores/${req.body.cedulaname}/${file.name}`,
              err => {}
            );
          });
          res.send({ status: true });
        }
        else res.send({ error: true });
      });
   client.close();
  });

});

router.post("/conductor", (req, res) => {

  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores").insertOne(req.body, (err, data) => {
      console.log("listo");

      if (err) res.send({ error: true });
      else res.send({ status: true });
    });
    client.close();
  });
});
module.exports = router;

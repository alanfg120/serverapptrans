const router = require("express").Router();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const fileUpload = require("express-fileupload");
var mkdir=require('./../filesystem')


router.post("/upload", fileUpload(), (req, res) => {
  console.log(req.body);
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores")
      .find({ cedula: req.body.cedulaname })
      .count()
      .then(async c => {
        console.log(c);
        if (c == 0) {
          try {
            await mkdir.newdir(`Documentos/Conductores/${req.body.cedulaname}`);
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
        } else res.send({ error: true });
      });
    client.close();
  });
});
router.post("/new", (req, res) => {
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores").insertOne(req.body, (err, data) => {
      console.log("listo");
      if (err) res.send({ error: true });
      else res.send({ status: true });
    });
    client.close();
  });
});
router.post("/update", (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores").updateOne(
      { _id: ObjectId("5cc0d8f9bd1a492f2c7156f2") },
      { $set: req.body },
      (err, rsl) => console.log(rsl.result)
    );

    client.close();
  });
  res.send("listo")
});
module.exports = router;

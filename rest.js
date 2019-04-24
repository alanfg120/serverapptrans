const router = require("express").Router();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";
const fileUpload = require("express-fileupload");

router.get("/login", (req, res) => {
  var token = jwt.sign({ name: "alan" }, jwtClave);
  console.log(token);
  res.send("listo");
});

router.post("/upload", fileUpload(), (req, res) => {
  Object.values(req.files).forEach(file => {
    console.log(file.name);
    file.mv(
      "Documentos/Conductores/" + req.body.cedula + "/" + file.name,
      err => {}
    );
  });
  res.send({ status: true });
});

router.post("/conductor", (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores").insert(req.body, (err, data) => {
     console.log(data);
     es.send({ status: true });
    });
    client.close();
  });
});
module.exports = router;

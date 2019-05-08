const router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const fileUpload = require("express-fileupload");
var mkdir = require("./../filesystem");


router.post("/upload", fileUpload(), (req, res) => {
  console.log(req.files);
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    db.collection("vehiculos")
      .find({ placa: req.body.placa })
      .count()
      .then(async c => {
        console.log(c);
        if (c == 0) {
          try {
            await mkdir.newdir(`Documentos/Vehiculos/${req.body.placa}`);
            console.log("listo");
          } catch (err) {
            console.log(err);
          }

          if (req.files) {
            Object.values(req.files).forEach(file => {
              file.mv(
                `Documentos/Vehiculos/${req.body.placa}/${file.name}`,
                err => {}
              );
            });
            res.send({ error: false });
          } else res.send({ error: true });
        } else res.send({ error: true });
      });
    client.close();
  });
});

router.post("/new", (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("vehiculos").insertOne(req.body, (err, rst) => {
      if (err) {
        console.log(err);

        res.status(400).send({ error: true });
      } else res.status(200).send({ error: false });
    });
    clt.close();
  });

  
});



module.exports = router;

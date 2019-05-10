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
    db.collection("vehiculos").insertOne(req.body,{ useNewUrlParser: true }, (err, rst) => {
      if (err) {
        res.send({ error: true });
      } else res.send({ status: true });
    });
    clt.close();
  });

  
});
router.get("/get", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("vehiculos")
      .find()
      .toArray()
      .then(data => {
        if (data) res.status(200).send(data);
      })
      .catch(err => res.status(400).send(err));
    clt.close();
  });
});
router.delete("/delete/:vehiculo", (req, res) => {
  console.log(req.params);

  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("vehiculos").deleteOne(
      { _id: ObjectId(req.params.vehiculo) },
      (err, rsl) => {
        if (err) res.status(400).send({ error: true });
        else res.status(200).send({ error: false });
      }
    );
  });
});
router.get("/get/:placa", (req, res) => {
  console.log(req.params);

  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("vehiculos")
      .find({ placa: req.params.placa })
      .toArray()
      .then(data => {
        if (data) res.status(200).send(data[0]);
      })
      .catch(err => res.status(400).send(err));
    clt.close();
  });
});
router.put("/update", (req, res) => {
 

  let _id = req.body._id;
  delete req.body._id;
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection("vehiculos").findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: req.body },
      (err, rsl) => {
        if (err) res.status(400).send({ error: true });
        else res.status(200).send({ error: false });
      }
    );

    client.close();
  });
});
router.post("/upload/update", fileUpload(), (req, res) => {
  console.log(req.files);
  
  if (req.files) {
    Object.values(req.files).forEach(file => {
      file.mv(
        `Documentos/Vehiculos/${req.body.placa}/${file.name}`,
        err => {}
      );
    });
    res.send({ status: true });
  } else res.send({ error: true });
});
router.put("/validar", (req, res) => {
  
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("vehiculos").updateOne(
      { _id: ObjectId(req.body._id) },
      { $set: { valido: req.body.valid } },
      (err,rsl)=>{
        if(err)res.status(400).send({error:true})
        else res.status(200).send({error:false})
      }
    );
    clt.close()
  });
});
module.exports = router;

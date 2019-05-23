const router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const fileUpload = require("express-fileupload");
var dir= require("./../filesystem");

router.post("/upload", fileUpload(), (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores")
      .find({ cedula: req.body.cedulaname })
      .count()
      .then(async c => {
        console.log(c);
        if (c == 0) {
          try {
            await dir.newdir(`Documentos/Conductores/${req.body.cedulaname}`);
            console.log("listo");
          } catch (err) {
            console.log(err);
          }

          if (req.files) {
            Object.values(req.files).forEach(file => {
              file.mv(
                `Documentos/Conductores/${req.body.cedulaname}/${file.name}`,
                err => {}
              );
            });
            res.send({ status: true });
          } else res.send({ error: true });
        } else res.send({ error: true });
      });
    client.close();
  });
});
router.post("/new", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores").insertOne(req.body, (err, data) => {
      if (err) {
        res.send({ error: true });
      } else res.send({ status: true });
    });
    client.close();
  });
});
router.put("/update", (req, res) => {
  console.log(req.body);

  let _id = req.body._id;
  delete req.body._id;
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection("conductores").findOneAndUpdate(
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
router.get("/get", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores")
      .find()
      .toArray()
      .then(data => {
        if (data) res.status(200).send(data);
      })
      .catch(err => res.status(400).send(err));
    clt.close();
  });
});
router.get("/get/:cedula", (req, res) => {
  console.log(req.params);

  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores")
      .find({ cedula: req.params.cedula })
      .toArray()
      .then(data => {
        if (data) res.status(200).send(data);
      })
      .catch(err => res.status(400).send(err));
    clt.close();
  });
});
router.delete("/delete/:conductor", (req, res) => {
  console.log(req.params);

  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores").deleteOne(
      { cedula: req.params.conductor},
      (err, rsl) => {
        if (err) res.status(400).send({ error: true });
        else {
          dir.deletedir(`Documentos/Conductores/${req.params.conductor}`)
          res.status(200).send({ error: false });
        }
      }
    );
  });
});
router.post("/upload/update", fileUpload(), (req, res) => {
  if (req.files) {
    Object.values(req.files).forEach(file => {
      file.mv(
        `Documentos/Conductores/${req.body.cedulaname}/${file.name}`,
        err => {}
      );
    });
    res.send({ status: true });
  } else res.send({ error: true });
});
router.put("/validar", (req, res) => {
  
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores").updateOne(
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

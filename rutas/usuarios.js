const router = require("express").Router();
var jwt = require("jsonwebtoken");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";
var jwtClave = "alan";

router.post("/login", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios")
      .find({ $and: [{ username: req.body.username }, { pwd: req.body.pwd }] })
      .count()
      .then(c => {
        if (c > 0) {
          var token = jwt.sign({ name: req.body.username }, jwtClave);
          res.status(200).send({ auth: true, token });
        } else res.status(400).send({ error: true });
      });
    clt.close();
  });
});
router.post("/new", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios").insertOne(req.body, (err, rst) => {
      if (err) res.status(400).json({ error: true });
      else res.status(200).send(req.body);
    });
    clt.close();
  });
});
router.get("/get", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios")
      .find()
      .toArray()
      .then(data => {
        if (data) res.status(200).send(data);
        else res.status(400).send({ error: true });
      });
    clt.close();
  });
});
router.put("/update", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios").updateOne(
      { _id: ObjectId(req.body._id) },
      { $set: req.body },
      (err, rsl) => {
        if (err) res.send(err);
        else res.send({ error: true });
      }
    );

    clt.close();
  });
});
router.delete("/delete/:usuario", (req, res) => {
  console.log(req.params);
  
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios").deleteOne(
      { username: req.params.usuario },
      (err, rst) => {
        if(err)res.status(401).send({error:true})
        else res.status(201).send({status:true})
      }
    );

    clt.close();
  });
});

module.exports = router;

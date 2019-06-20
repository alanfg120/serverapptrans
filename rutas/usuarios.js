const router = require("express").Router();
var jwt = require("jsonwebtoken");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";
var jwtClave = "alan";
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios")
      .find({ username: req.body.username })
      .toArray((err, user) => {
      
          bcrypt
            .compare(req.body.pwd, user[0].pwd)
            .then(hash => {
              if (hash) {
                var token = jwt.sign(
                  { name: req.body.username, rol: user[0].rol },
                  jwtClave
                );
                res.status(200).send({ auth: true, token });
              } else res.status(400).send({ error: true });
            })
            .catch(err => res.status(400).send({ error: true }));
      });

    clt.close();
  });
});
router.post("/new", (req, res) => {
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    bcrypt.hash(req.body.pwd, 10, function(error, hash) {
      req.body.pwd = hash;
      db.collection("usuarios").insertOne(req.body, (err, rst) => {
        if (err) res.status(400).send({ error: true });
        else res.status(200).send(req.body);
      });
      clt.close();
    });
  });
});
router.get("/get", (req, res) => {
  console.log(req.token);

  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios")
      .find({ username: { $ne: "administrador" } })
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

    bcrypt.hash(req.body.pwd, 10, (error, hash) => {
      db.collection("usuarios").updateOne(
        { _id: ObjectId(req.body._id) },
        { $set: { pwd: hash, rol: req.body.rol } },
        (err, rsl) => {
          if (err) res.send(err);
          else res.send(rsl);
        }
      );
      clt.close();
    });
  });
});
router.delete("/delete/:usuario", (req, res) => {
  console.log(req.params);

  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("usuarios").deleteOne(
      { username: req.params.usuario },
      (err, rst) => {
        if (err) res.status(401).send({ error: true });
        else res.status(201).send({ status: true });
      }
    );

    clt.close();
  });
});

module.exports = router;

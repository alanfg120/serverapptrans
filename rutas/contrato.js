const router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const fileUpload = require("express-fileupload");
var mkdir = require("./../filesystem");

router.get("/validconductor", (req, res) => {
    MongoClient.connect(url,  (err, clt) => {
      const db = clt.db(dbName);
      db
        .collection("conductores")
        .find({ valido: true })
        .project({ nombre: 1 , cedula: 1 })
        .toArray().then(data=>{
        res.status(200).send(data)

        })
       
    });

  });

module.exports = router;

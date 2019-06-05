const router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const fileUpload = require("express-fileupload");
var dir = require("./../filesystem");
const PDFMerge = require("pdf-merge");
var rutafiles = require("./../filesconductor");
var documentos = require("./../filesconductor").documentos;
var ip="167.99.154.108:3000"




router.post("/upload", fileUpload(), (req, res) => {
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
            if (req.files) {
              Object.values(req.files).forEach(file => {
                file.mv(
                  `Documentos/Conductores/${req.body.cedulaname}/${file.name}`,
                  err => {}
                );
              });
              res.send({ status: true });
            } else res.send({ error: true });
          } catch (err) {
            throw err;
          }
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
  MongoClient.connect(url, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores").deleteOne(
      { cedula: req.params.conductor },
      (err, rsl) => {
        if (err) res.status(400).send({ error: true });
        else {
          dir.deletedir(`Documentos/Conductores/${req.params.conductor}`);
          res.status(200).send({ error: false });
        }
      }
    );
  });
});
router.post("/upload/update", fileUpload(), (req, res) => {
  console.log(req.files);
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
 
MongoClient.connect(url, { useNewUrlParser: true }, (err, clt) => {
    const db = clt.db(dbName);
    dir.count(`Documentos/Conductores/${req.body.cedula}`).then(files => {
      let archivospendientes = documentos.filter(dif => !files.includes(dif));
      if (archivospendientes.length > 0) {
        db.collection("conductores").updateOne(
          { cedula: req.body.cedula },
          { $set: { pendientes: archivospendientes } },
          (err, rsl) => {
            if (err) res.status(400).send({ error: true });
            else res.status(200).send(archivospendientes);
          }
        );
        clt.close();
      } else {
        let ruta = `Documentos/Conductores/${
          req.body.cedula
        }/hojadevidaconductor.pdf`;

        PDFMerge(rutafiles.rutafiles(req.body.cedula), { output: ruta }).then(
          data => {
            db.collection("conductores").updateOne(
              { cedula: req.body.cedula },
              { $set: { hojadevida: `http://${ip}/${ruta}`,pendientes:[]} },
              (err, rsl) => {
                console.log(err);
                
                if (err) res.status(400).send({ error: true });
                else res.status(200).send({ error: false });
              }
            );
            clt.close();
          }
        );
      }
    });

  
  });
});
module.exports = router;

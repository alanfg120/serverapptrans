const router = require("express").Router();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";
const fileUpload = require("express-fileupload");

var jwtClave="alan";

router.get("/login", (req, res) => {
    var token = jwt.sign({ name: "alan" }, jwtClave);
    console.log(token);
    res.send("listo");
  });


module.exports=router
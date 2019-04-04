const router = require("express").Router();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var jwtClave = "adsgkgsf";
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb")
const dbName = "apptrans"
const url = 'mongodb://localhost:27017';



router.get("/login", (req, res) => {
   
  



});

  module.exports = router;
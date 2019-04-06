var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var jwtClave = "adsgkgsf";
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb")
const dbName = "apptrans"
const url = 'mongodb://localhost:27017';


var resolvers = {
  hello: () => "Hello world!",
  usuario: () => {
    return {
      id: "12",
      name: "alan",
      lastname: "hola"
    };
  }
};

module.exports = resolvers;

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";

var resolvers = {
  hello: () => "Hello world!",
  usuario: async({ name, pwd }) => {
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      db.collection("Usuarios")
        .find({ $and: [{ name: name }, { pwd: pwd }] })
        .count()
        .then(value => {
          console.log(value);
        });

      client.close();
    });
    return { name: name, token: "hdfhjdfhsdjfh" };
  }
};

module.exports = resolvers;

var express = require("express");
var app = express();
var server = require("http").Server(app);
global.io = require("socket.io")(server);
var cors = require("cors");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var jwtClave = "alan";
var conductor = require("./rutas/conductor");
var usuario = require("./rutas/usuarios");
var contrato = require("./rutas/contrato");
var vehiculo = require("./rutas/vehiculo");
var trailer = require("./rutas/trailer");
var job = require("./notificaciones");

io.on("connection", function(socket) {
  console.log("Un cliente se ha conectado", socket.id);
  socket.on("disconnect", function() {
    console.log("Un cliente se ha desconectado", socket.id);
  });
});

app.use(cors());

app.use(express.static(__dirname + "/dist"));

app.use("/Documentos", express.static(__dirname + "/Documentos"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressJwt({ secret: jwtClave, requestProperty: "token" }).unless({
    path: ["/usuario/login", "/hola"]
  })
);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized");
  }
});

app.get("/hola", (req, res) => {
  io.emit("message", "hola");
  res.send("hola");
});
app.use("/conductor", conductor);
app.use("/usuario", usuario);
app.use("/contrato", contrato);
app.use("/vehiculo", vehiculo);
app.use("/trailer", trailer);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxhbmZnMTIwQGdtYWlsLmNvbSIsImlhdCI6MTU1ODA0NDYzNH0.SxfUBnyV9Tpl8gQy0EM7KCOHLT-3q5BtB-BF48qXl1Q
server.listen(3000, function() {
  console.log(`listen 3000`);
});

var mail = require("./mail");
var moment = require("moment");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";
var schedule = require("node-schedule");

var job = schedule.scheduleJob("40 19 * * *", function() {
  
  let cursosvencidos = [];
  var fecha = moment()
    .format("LL")
    .toString();
  var fechahoy = moment(fecha, "LL")
    .add(2, "days")
    .toISOString();
  console.log(fechahoy);
  MongoClient.connect(url, { useNewUrlParser: true }, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores")
      .find({
        $or: [{ "licencia.vigencia": fechahoy }, { "cursos.fecha": fechahoy }]
      })
      .toArray()
      .then(data => {
        console.log(data);
        if (data.length > 0)
          data.forEach(value => {
            if (value.licencia.vigencia == fechahoy) {
              mail(
                value.email,
                "Su licencia de Conduccion esta por vencerce por favor renueve este documento"
              );
            }
            value.cursos.forEach(cursos => {
              if (cursos.fecha == fechahoy) {
                cursosvencidos.push(cursos.tipo);
              }
            });
            if (cursosvencidos.length > 0)
              mail(
                value.email,
                `Por favor Renueve los Siguientes cursos ${cursosvencidos.toString()}`
              );
          });
        else io.emit("message","notificaciones")
      });
  });
});

module.exports = job;

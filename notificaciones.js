var schedule = require("node-schedule");
var mail = require("./mail");
var moment = require("moment");
var MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const dbName = "apptrans";
const url = "mongodb://localhost:27017";

var job = schedule.scheduleJob("09 16 * * *", () =>{
  let cursosvencidos = [];
  var fecha = moment()
    .format("LL")
    .toString();
  var fechahoy = moment(fecha, "LL").toISOString();
  MongoClient.connect(url, { useNewUrlParser: true }, (err, clt) => {
    const db = clt.db(dbName);
    db.collection("conductores")
      .find({
        $or: [{ "cursos.fecha": fechahoy }, { "licencia.vigencia": fechahoy }]
      })
      .toArray()
      .then(data => {
        data.forEach(value => {
          if (value.licencia.vigencia == fechahoy) {
            mail(
              value.email,
              "Su licencia de Conduccion se ha vencido por favor renueve este documento"
            )
             
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
            )
        });
      });
  });



  
});
module.exports = job;



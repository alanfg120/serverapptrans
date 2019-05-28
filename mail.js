var nodemailer = require("nodemailer");
 
 
function mail(correo,messaje){

    
    
    
    
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "apptransnotificaciones@gmail.com",
          pass: "hgaf.120"
        }
      });
      var mailOptions = {
        from: "alanfg120@gmail.com",
        to: correo,
        subject: "Vencimiento de Documentos",
        text: messaje
      };
      transporter.sendMail(mailOptions).then(msj=>console.log("estado:",msj.accepted)).catch(err=>console)
}


module.exports=mail 
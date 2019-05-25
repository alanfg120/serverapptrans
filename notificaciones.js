var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var job = schedule.scheduleJob('54 9 * * *', function(){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alanfg120@gmail.com',
      pass: 'alan.120'
    }
  });
  var mailOptions = {
    from: 'alanfg120@gmail.com',
    to: 'alanf120@hotmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hola!'
  };
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



});

module.exports=job
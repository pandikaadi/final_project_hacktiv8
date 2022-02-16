const nodemailer = require('nodemailer');

function sendMail(email,username) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shavetive8@gmail.com',
        pass: 'Bismillah8'
      }
    });
  
    let mailOptions = {
      from: 'Shavetive8',
      to: email,
      subject: `thank you for signing up wih Shavetive8`,
      text: `Hi ${username},
      welcome to Shavetive8
      `
    };
  
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
    });
  }

module.exports = sendMail
const nodemailer = require('nodemailer');

function sendMail(email,username,barberName,service) {
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
    subject: `thank you for your order `,
    text: `Hi ${username},
    you ordered our barber ${barberName} for service ${service}
    `
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
  });
}
module.exports = sendMail
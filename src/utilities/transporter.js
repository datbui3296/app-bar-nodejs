const nodemailer = require('nodemailer');

const  createTransporter = () => {
  // Configure Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'datbui3296@gmail.com',
      pass: 'matkhau'
    },
   
  });

  return transporter;
}

module.exports = createTransporter;
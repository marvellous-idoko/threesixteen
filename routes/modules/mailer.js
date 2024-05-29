const nodemailer = require('nodemailer');

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'gordon.jones2024@gmail.com',
  subject: '👋 Hello from Node.js 🚀',
  text: 'This is a test email sent from Node.js using nodemailer. 📧💻',
  html: "<b>Hello world?</b>",
};

// Send the email
//     console.log('kjhg')

function sendMail(mailOptions){
    mailOptions.from = process.env.EMAIL_USER;
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
}
// sendMail()

module.exports = {
     sendMail
}

const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports.sendmail = (mail, otp)=>{
    return new Promise((resolve, reject)=>{
        const mailOptions = {
            from: process.env.EMAIL,
            to: `${mail}`,
            subject: 'OTP from login app',
            text: `Your OTP is ${otp}`
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                reject({error, message: error})
            } else {
              resolve({ error, message: 'Check you Email for OTP'})
            }
          });
    })
      
}
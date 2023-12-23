const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uma94933.test1@gmail.com',
        pass: 'catuzgmebonvhwhr'
    }
});

module.exports.sendmail = (mail, otp)=>{
    return new Promise((resolve, reject)=>{
        const mailOptions = {
            from: 'uma94933.test1@gmail.com',
            to: `${mail}`,
            subject: 'OTP from login app',
            text: `Your OTP is ${otp}`
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
              console.log('Email sent: ' + info.response);
              resolve('Check you Email for OTP')
            }
          });
    })
      
}
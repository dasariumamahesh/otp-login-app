const express = require('express')
const app = express()
const { checkOtp, verifyOtp } = require('../redis/redis')
const { generateOtp} = require('../otp/generateOTP')
const { generateOtpValidator, loginValidator } = require('../input-validation/validator')

app.get('/test', (req, res) => res.send("Test route working!"));
app.post('/generate-otp', generateOtpValidator, checkOtp, generateOtp)
app.post('/login', loginValidator, verifyOtp)

module.exports = app
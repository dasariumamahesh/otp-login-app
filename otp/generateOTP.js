const speakeasy = require('speakeasy');
const mail = require("./sendEmail");
const redis = require("redis");
const client = redis.createClient( { url: process.env.REDIS_URL});
require('dotenv').config();

const secret = process.env.SECRET;

client.connect();
client.on('error', err => console.log('Redis Client Error', err));

async function generateOtp(req, res) {
    try {
        const otp = speakeasy.totp({
            secret: secret,
            encoding: 'base32'
        });

        mail.sendmail(req.body.email, otp).then(async (resolve, reject) => {
            if (resolve) {
                await client.set(req.body.email, JSON.stringify({ otp, tries: 3 }), { EX: 30, NX: true });
                res.status(200).send({ Message: resolve.message })
            } else {
                res.status(500).send({ Error: reject.message })
            }
        })
    } catch (error) {
        res.status(500).send({ Message: "OTP generation failed" })
    }
}

module.exports = { generateOtp };

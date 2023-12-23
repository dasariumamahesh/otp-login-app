const redis = require('redis');
const client = redis.createClient( { url: process.env.REDIS_URL});
client.on('error', err => console.log("Redis client Error", err));
client.connect();

async function checkOtp(req, res, next) {
  let userDetails = JSON.parse(await client.get(`${req.body.email}`));
  if (!userDetails) {
    next();
  } else {
    res.status(500).send({ Message: "OTP already sent. For a new OTP retry after 5 min" });
  }
};

async function verifyOtp(req, res) {
  let userDetails = JSON.parse(await client.get(req.body.email));
  if (!userDetails) {
    res.status(500).send({ Message: "Request OTP again" });
  } else {
    if (userDetails.tries > 0) {
      if (req.body.otp != userDetails.otp) {
        const expTime = await client.ttl(req.body.email)
        userDetails.tries--;
        await client.set(req.body.email, JSON.stringify(userDetails), { XX: true, EX: expTime })
        res.status(500).send({ Message: `Invalid OTP. Tries remaining: ${userDetails.tries}` });
      } else {
        res.send("Login sucessful");
      }
    } else {
      res.status(500).send({ Message: `Number of tries exhausted. Try again after 5 min` });
    }
  }
}

module.exports = { checkOtp, verifyOtp };  

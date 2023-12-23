const {check, validationResult} = require('express-validator')
const validationRules = require('./validationRules')
const validator = (req,res,next)=>{
    const e = validationResult(req)
    if(e.errors.length>0){
        let errorMessage = {
            error: "BadRequestError",
            message: "Request doesn\'t contain all the fields.",
            errors: e.errors.map(detail=>detail.msg)
        }
        res.status(400).send(errorMessage)
    }else{
        next()
    }
}
module.exports.generateOtpValidator = [
    validationRules.email,
    validator
]

module.exports.loginValidator = [
    validationRules.email,
    validationRules.otp,
    validator
]

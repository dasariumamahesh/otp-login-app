const { check, validationResult } = require('express-validator')

module.exports = {
    email: check('email').exists().withMessage('Email required').isEmail().withMessage('Invalid Email'),
    otp: check('otp')
        .exists().withMessage('OTP required')
        .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
        .isNumeric().withMessage('OTP must be numeric')
}
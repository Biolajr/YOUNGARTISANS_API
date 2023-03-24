const express =  require('express');
const createUser = require('../controllers/auth/register');
const verifyUserToken = require('../controllers/auth/verifyToken');
const resendOTP = require('../controllers/auth/resendOTP');
const login = require('../controllers/auth/login');
const forgotPassword = require('../controllers/auth/forgot/forgot');
const verifyResetToken = require('../controllers/auth/forgot/verifyResetToken');
const changePassword = require('../controllers/auth/forgot/changePassword');

const createSubUser = require('../controllers/evp-superevp/accounts/create');
const getMySubs = require('../controllers/evp-superevp/accounts/getMySubs');



const {
  verifyToken
} = require("../middleware/authJwt");

const router = express.Router();

// Registration
/**
 * @Description {String} Registration route
 * @Params {Object} params
 * @returns {Object} response
 * @method {POST} /api/v1/auth/register
 */
router.post('/register', createUser);
/**
 * @Description {String} verification token sent to user provided Phone Number
 * @Parameter {String}
 * @Method {POST} /api/v1/auth/verify-token
 * @Return {Object} 
 */
router.post('/verify-token', verifyUserToken);
/**
 * @Description {String} Resend token 
 * @Method {*GET} /api/v1/auth/resend-token
 * @Return {Object}
 */
router.get('/resend-otp', resendOTP);

// Login
router.post('/login', login);

// Forgot password
router.post('/forgot-password', forgotPassword);

router.post('/change-password', changePassword);

router.post('/verify-reset-token', verifyResetToken);

router.post('/evp-superevp/register', verifyToken, createSubUser);

router.get('/evp-superevp/my-users', verifyToken, getMySubs);


  
module.exports = router;
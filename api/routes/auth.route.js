const express = require('express');
const {registerUser, loginUser, forgotPassword, changePassword} = require('../controllers/auth.controller');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/changepassword/:id').post(changePassword);




module.exports = router;
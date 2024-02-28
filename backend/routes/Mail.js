const express = require('express');
const {sendMail,resetPassword} = require('../controller/mailController');
const router = express.Router();
router.post('/forgot-password', sendMail).post('/reset-password/:id/:token/', resetPassword);
exports.router = router;

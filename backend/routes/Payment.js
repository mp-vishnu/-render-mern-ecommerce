const express = require('express');
const {checkPayment} = require('../config/payment');
const passport=require("passport");
const router = express.Router();

router.post('/create-payment-intent', checkPayment.checkPayment);
exports.router = router;
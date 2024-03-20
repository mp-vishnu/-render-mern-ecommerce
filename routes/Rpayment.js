const express = require('express');
const router = express.Router();
const {rorders,rverify}=require('../controller/Rpayment');

router.post('/orders', rorders).post('/verify',rverify);
exports.router = router;
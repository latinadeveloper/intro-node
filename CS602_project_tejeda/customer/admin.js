const express = require('express');
const router = express.Router();
const Customer  = require('./schema.js');

router.get('/', (req , res , next) => {
  Customer.find({}, (err, customers) => {
    res.render('customer/admin', { customers: customers })
  });
})

module.exports = router; // exports routes

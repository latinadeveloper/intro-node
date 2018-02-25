const express = require('express');
const router = express.Router();
const Customer  = require('./schema.js');
const doTotal = require('./total.js');

router.post('/', (req , res , next) => {  // saves the changes after the edit is made
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const orderItem = { product: productId, quantity: quantity };
  let customerId = req.session.customerId;
  if (customerId) {
    console.log("Updating Customer: " + customerId);
    Customer.findById(customerId, (err, customer) => { // lookup Customer
      customer.cart.push(orderItem)
      customer.save((err) => {
        if(err)
          console.log("Error saving : %s ", err);
      });
    });
  } else {
    // Create new customer
    let customer = new Customer({
      cart: [orderItem],
      orders: [],
    });
    customer.save((err) => {
      if(err)
        console.log("Error saving : %s ", err);
    });
    console.log("Created Customer: " + customer._id);
    req.session.customerId = customer._id;
  }

  res.redirect('/cart');
})

router.get('/', (req , res , next) => {
  let customerId = req.session.customerId;

  Customer.findById(customerId).populate('cart.product').exec((err, customer) => {
    const cart = customer.cart;
    const total = doTotal(cart);
    console.log("Showing Customer: " + customer);
    res.render('customer/cart', { total: total, items: customer.cart })
  });
})

module.exports = router; // exports routes

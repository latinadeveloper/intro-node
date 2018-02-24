const express = require('express');
const router = express.Router();
//const productModule = require("./productModule");

const Product  = require('./schema.js');

// products routes

router.get('/', (req , res , next) => { // shows all of the products
  const name = req.query.name;
  const description = req.query.description;
  var query = {};
  if (name && name != '') {
    query.name = new RegExp(name);
  }
  if (description && description != '') {
    query.description = new RegExp(description);
  }
  Product.find(query, (err , products) => {
    if(err)
        console.log("Error : %s ",err);

    let results = products.map( (product) => {
      return {
        id: product._id,
        name: product.name,
        stock: product.stock,
        description: product.description,
        price: product.price
      }
    });

    res.render('product/admin/index', {products: results, name: name, description: description});
  });
});

router.get('/add', (req , res , next) => {
  res.render('product/admin/add') // render add product static page with form
});

router.post('/add', (req , res , next) => {
  let product = new Product({
    name: req.body.name,
    stock: req.body.stock,
    description: req.body.description,
    price: req.body.price
  });

  product.save((err) => {
    if(err)
      res.status(400).send(err);
    else
      res.redirect('/admin/products');
  })
});

router.get('/edit/:id', (req , res , next) => { // edits product in the database
  let id = req.params.id;

  Product.findById(id, (err, product) => {
    if(err)
      console.log("Error Selecting : %s ", err);
    if (!product)
      return res.render('404');

    res.render('product/admin/edit',
        {title:"Edit Product",
         data: {id: product._id,
                name: product.name,
                stock: product.stock,
                description: product.description,
                price: product.price
               }
        });
  });
});

router.post('/edit/:id', (req , res , next) => {  // saves the changes after the edit is made
  let id = req.params.id;

  Product.findById(id, (err, product) => {
    if(err)
      console.log("Error Selecting : %s ", err);
    if (!product)
      return res.render('404');

    product.name = req.body.name;
    product.stock = req.body.stock;
    product.description = req.body.description;
    product.price = req.body.price;
    product.save((err) => {
      if(err)
        res.status(400).send(err);
      else
        res.redirect('/admin/products');
    });
  });
});

router.get('/delete/:id', (req , res , next) => {
  let id = req.params.id;

  Product.findById(id,  (err, product) => {
    if(err)	// handles errors
      console.log("Error Selecting : %s ", err);
    if (!product) // shows errors if product not found
      return res.render('404');

    product.remove( (err) => {
      if (err)
        console.log("Error deleting : %s ",err );
      res.redirect('/admin/products');
    });
  });
});

module.exports = router; // exports routes

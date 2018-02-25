const Product  = require('./schema.js');

module.exports = (template) => {
  return (req , res , next) => { // shows all of the products
    var query = {};
    const name = req.query.name;
    if (name && name != '') {
      query.name = new RegExp(name); // RegExp finds partial matches
    }

    const description = req.query.description;
    if (description && description != '') {
      query.description = new RegExp(description);
    }

    const min = parseFloat(req.query.min);
    if (min) {
      query.price = { $gte: min }
    }

    const max = parseFloat(req.query.max);
    if (max) {
      if (!query.price)
        query.price = {}
      query.price.$lte = max
    }

    console.log("Query: " + JSON.stringify(query));

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

      res.format({
        'application/json': () => { // this is for JSON response
          const result = products.map((p) => {
            return {
              id: p._id,
              name: p.name,
              stock: p.stock,
              description: p.description,
              price: p.price
            }
          });
          // res.json(result)
          res.send(JSON.stringify(result, null, 2));
        },

        'application/xml': () => {
          const productXML = (product) => {
            return ' <product id="' + product._id + '">\n  <name>' +
              product.name + '</name>\n  <stock>' +
              product.stock + '</stock>\n  <description>' +
              product.description + '</description>\n  <price>' +
              product.price + '</price>\n </product>';
          }

          let xml =
            '<?xml version="1.0"?>\n<products>\n' + // this is the xml response
              products.map(productXML).join('\n') + '\n</products>\n'

          res.type('application/xml');
          res.send(xml); // sends what is in the xml
        },

        'text/html': () => {
          res.render(template, {
            products: results,
            name: name,
            description: description
          });
        },
      })
    });
  }
}

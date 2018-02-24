const express = require('express');
const app = express();

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars',
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// to parse request body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
var routes = require('./product/admin');
app.use('/admin/products', routes);

app.get('/', (req, res, next) => {
  res.redirect('/admin/products');
});

app.use((req, res) => {
	res.status(404); // renders if no routes are found
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000'); // logging the port is listening on
});

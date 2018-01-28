const express = require('express');
const app = express();
const employeeModule = require('./employeeModule')

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars',
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// to parse request body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET request to the homepage
app.get('/', (req, res) => {
	res.render('home');
});

function employeeXml(employee) {
  return ' <employee id="' + employee.id + '">\n  <firstName>' +
    employee.firstName + '</firstName>\n  <lastName>' +
    employee.lastName + '</lastName>\n </employee>'
}

app.get('/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let employee = employeeModule.lookupById(id);

  res.format({
    'application/json': () => {
      res.json(employee);
    },

    'application/xml': () => {
      let xml =
        '<?xml version="1.0"?>\n' +
          employeeXml(employee) + '\n'

      res.type('application/xml');
      res.send(xml);
    },

    'text/html': () => {
	      res.render('employee', { id: id, employee: employee });
    },
  })
});

app.get('/lastName/:name', (req, res) => {
  const lastName = req.params.name;
  let employees = employeeModule.lookupByLastName(lastName);

  res.format({
    'application/json': () => {
      res.json(employees);
    },

    'application/xml': () => {
      let xml =
        '<?xml version="1.0"?>\n<employees>\n' +
          employees.map(e => employeeXml(e)).join("\n") +
        '\n</employees>\n'

      res.type('application/xml');
      res.send(xml);
    },

    'text/html': () => {
	      res.render('employees', { name: lastName, employees: employees });
    },
  })
});

app.get('/addEmployee', (req, res) => {
  res.render('addEmployee')
});

app.post('/addEmployee', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  employeeModule.addEmployee(firstName, lastName)
  res.redirect('/lastName/' + lastName)
});

app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

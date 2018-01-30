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

// GET request to the homepage with welcome message
app.get('/', (req, res) => {
	res.render('home');
});

function employeeXml(employee) { // common part for employee xml response
  return ' <employee id="' + employee.id + '">\n  <firstName>' +
    employee.firstName + '</firstName>\n  <lastName>' +
    employee.lastName + '</lastName>\n </employee>'
}

app.get('/id/:id', (req, res) => {  
  const id = parseInt(req.params.id); // turn id from string to integer
  let employee = employeeModule.lookupById(id); 

  res.format({
    'application/json': () => { // this is for JSON response
      res.json(employee);
    },

    'application/xml': () => {
      let xml =
        '<?xml version="1.0"?>\n' + // this is the xml response
          employeeXml(employee) + '\n'

      res.type('application/xml');
      res.send(xml); // sends what is in the xml
    },

    'text/html': () => { 
	      res.render('employee', { id: id, employee: employee }); // renders the emplyee handlebar template
    },
  })
});

app.get('/lastName/:name', (req, res) => {
  const lastName = req.params.name;
  let employees = employeeModule.lookupByLastName(lastName); // calls to look up employee

  res.format({
    'application/json': () => {// this is for JSON response
      res.json(employees);
    },

    'application/xml': () => {
      let xml =
        '<?xml version="1.0"?>\n<employees>\n' +
          employees.map(e => employeeXml(e)).join("\n") +// this is the xml response
        '\n</employees>\n'

      res.type('application/xml');
      res.send(xml); // sends what is in the xml
    },

    'text/html': () => {
	      res.render('employees', { name: lastName, employees: employees }); // renders the emplyee handlebar template
    },
  })
});

app.get('/addEmployee', (req, res) => {
  res.render('addEmployee') // render add employee static page with form
});

app.post('/addEmployee', (req, res) => {
  const firstName = req.body.firstName; // receives parsed body with first and last name of employee
  const lastName = req.body.lastName;
  employeeModule.addEmployee(firstName, lastName)
  res.redirect('/lastName/' + lastName)
});

app.use((req, res) => {
	res.status(404); // renders if no routes are found
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000'); // logging the port is listening on
});

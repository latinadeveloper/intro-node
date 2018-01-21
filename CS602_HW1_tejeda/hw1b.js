const EmployeeEmitter = require('./employeeEmitter').EmployeeEmitter;
var colors = require('colors/safe'); //adding colors

// test array with data to see if EmployeeEmitter work
var data = [
	{id:1 , firstName : 'John', lastName : 'Smith'},
  {id: 2, firstName : 'Jane',  lastName : 'Smith'},
	{id: 3,firstName : 'John', lastName : 'Doe'}
];

// create instance of employeeEmitter
const employeeEmitter = new EmployeeEmitter(data);

employeeEmitter.on('lookupById', function (searchId) {
    console.log(colors.green('Event lookupById raised!',searchId));
});

employeeEmitter.on('lookupByLastName', function (searchLastName) {
    console.log(colors.green('Event lookupByLastName raised!',searchLastName));
});

employeeEmitter.on('addEmployee', function (firstName, lastName) {
    console.log(colors.green('Event addEmployee raised!',firstName, lastName));
});


// output to console
console.log(colors.blue("Lookup by last name (Smith)"))
console.log(employeeEmitter.lookupByLastName("Smith"))
console.log("")

console.log(colors.blue("Adding employee William Smith"))
employeeEmitter.addEmployee("William", "Smith")
console.log("")

console.log(colors.blue("Lookup by last name (Smith)"))
console.log(employeeEmitter.lookupByLastName("Smith"))
console.log("")

console.log(colors.blue("Lookup by id (2)"))
console.log(employeeEmitter.lookupById(2))

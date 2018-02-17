const connection = require('./dbConnection.js');
const EmployeeDb = require('./employee/schema.js');
const Employee = EmployeeDb.getModel(connection);
// data that will be imported every time it runs
const data = [
	{ firstName: 'John', lastName: 'Smith'},
  { firstName: 'Jane', lastName: 'Smith'},
	{ firstName: 'John', lastName: 'Doe'}
];

connection.on("open", () => {
  Employee.remove({}, (err) => { // remoe all existing records/collections
    if (err) throw err;
    console.log("Removed Existing Records!");
  })

  data.forEach((item) => { // going through each data item and inserting
    employee = new Employee(item);
    employee.save((err) => {
      connection.close();
      if (err) throw err;
      console.log("Success!");
    });
  })
});

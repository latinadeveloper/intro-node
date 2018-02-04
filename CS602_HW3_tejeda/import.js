const connection = require('./dbConnection.js');
const EmployeeDb = require('./employee/schema.js');
const Employee = EmployeeDb.getModel(connection);

const data = [
	{ firstName: 'John', lastName: 'Smith'},
  { firstName: 'Jane', lastName: 'Smith'},
	{ firstName: 'John', lastName: 'Doe'}
];

connection.on("open", () => {

  data.forEach((item) => {
    employee = new Employee(item);
    employee.save((err) => {
      connection.close();
      if (err) throw err;
      console.log("Success!");

      console.log("Reading data")

      Employee.find({}, 'firstName lastName',
        (err, results) => {
          if (err) throw err;
          console.log("\nFind all employees");
          console.log(results);
        });
    });
  })
});

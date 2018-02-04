const connection = require('../dbConnection.js');
const EmployeeDb = require('./schema.js');
const Employee = EmployeeDb.getModel(connection);

module.exports = {
	addEmployee: (req , res , next) => {
		res.render('addEmployee') // render add employee static page with form
	},

	saveEmployee: (req , res , next) => {
		let employee = new Employee({
			firstName: req.body.firstName,
			lastName: req.body.lastName
		});

    employee.save((err) => {
      if(err)
        console.log("Error : %s ",err);
      res.redirect('/employees');
    });
	},

	deleteEmployee: (req , res , next) => {
		let id = req.params.id;

		Employee.findById(id,  (err, employee) => {
			if(err)	// handles errors
				console.log("Error Selecting : %s ", err);
			if (!employee) // shows errors if employee not found
				return res.render('404');

			employee.remove( (err) => {
				if (err)
					console.log("Error deleting : %s ",err );
				res.redirect('/employees');
			});
		});
	},

	editEmployee: (req , res , next) => {
	    let id = req.params.id;

	    Employee.findById(id, (err, employee) => {
	      if(err)
	        console.log("Error Selecting : %s ", err);
	      if (!employee)
	        return res.render('404');

	      res.render('editEmployee',
	          {title:"Edit Employee",
	           data: {id: employee._id,
	                  firstName: employee.firstName,
										lastName: employee.lastName }
	          });
	    });
	},

	saveAfterEdit: (req , res , next) => {
	    let id = req.params.id;

	    Employee.findById(id, (err, employee) => {
	      if(err)
	        console.log("Error Selecting : %s ", err);
	      if (!employee)
	        return res.render('404');

	        employee.firstName = req.body.firstName
	        employee.lastName = req.body.lastName;
	        employee.save((err) => {
	          if (err)
	            console.log("Error updating : %s ",err );
	          res.redirect('/employees');
	        });
	    });
	  },

	displayEmployees: (req , res , next) => {
		    Employee.find({}, (err , employees) => {
		      if(err)
		          console.log("Error : %s ",err);

		      let results = employees.map( (employee) => {
		      	return {
		      		id: employee._id,
		          firstName: employee.firstName,
		          lastName: employee.lastName
		      	}
		      });

		      res.render('employees', {employees: results});
		    });
		}
}

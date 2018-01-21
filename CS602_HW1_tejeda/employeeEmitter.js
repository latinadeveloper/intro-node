const EventEmitter = require('events').EventEmitter;
// importing underscore library
var _ = require('underscore');

// Custom class
class EmployeeEmitter  extends EventEmitter {
	constructor(args) {
		super();
		this.data = args; // saves it to the instance variable data
	}

	// member functions that raises an event
	lookupById(searchId) {
		this.emit('lookupById', searchId)
		return _.findWhere(this.data,{id: searchId});
	}

	lookupByLastName(searchLastName) {
		this.emit('lookupByLastName', searchLastName)
		return _.where(this.data, {lastName: searchLastName})
	}

	addEmployee(firstName, lastName) {
		this.emit('addEmployee', firstName, lastName)
		const id  = (_.max(_.pluck(this.data, 'id'))) + 1
    this.data.push({id, firstName, lastName})
	}
}

module.exports = {
	EmployeeEmitter: EmployeeEmitter  // refering to class EmployeeEmitter,
}

// importing underscore library
var _ = require('underscore');

// test array with data to see if functions work
var data = [
	{id: 1, firstName: 'John', lastName: 'Smith'},
  {id: 2, firstName: 'Jane',  lastName: 'Smith'},
	{id: 3, firstName: 'John', lastName: 'Doe'}
];

module.exports = {
  lookupById: function(searchId) {
    return _.findWhere(data,{id: searchId});
  },

  lookupByLastName: function(searchLastName){
    return _.where(data, {lastName: searchLastName})
  },

  addEmployee: function(firstName, lastName){
    // I first get all of the ids, then I get the max out of the id
    const id  = (_.max(_.pluck(data, 'id'))) + 1 // adding one to increase the id
    data.push({id, firstName, lastName})
    //console.log(data) //used to see what data was
  }
}

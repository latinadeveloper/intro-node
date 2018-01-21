// ./ required to find the corresponding module
var answer =require('./employeeModule')
var colors = require('colors/safe'); //adding colors

// logging out the output to the console, adding blank lines for readability

console.log(colors.red("Lookup by last name (Smith)"))
console.log(answer.lookupByLastName("Smith"))
console.log("")
console.log(colors.red("Adding employee William Smith"))
answer.addEmployee("William", "Smith")
console.log("")
console.log(colors.red("Lookup by last name (Smith)"))
console.log(answer.lookupByLastName("Smith"))
console.log("")
console.log(colors.red("Lookup by id (2)"))
var two = answer.lookupById(2)
console.log(two)
console.log("")
console.log(colors.red("Changing first name..."))
two.firstName = "Mary"
console.log("")
console.log(colors.red("Lookup by id (2)"))
console.log(answer.lookupById(2))
console.log("")
console.log(colors.red("Lookup by last name (Smith)"))
console.log(answer.lookupByLastName("Smith"))

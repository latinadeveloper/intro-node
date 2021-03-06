const employeeModule = require('./employeeModule')
const net = require('net');
var colors = require('colors/safe'); //adding colors

const server = net.createServer(
	socket => {
		console.log(colors.red("Client connection..."));

		socket.on('end', () => {
				console.log(colors.red("Client disconnected..."));
			});

		// process data from client
		socket.on('data', data => {
        let command_string = data.toString() // 'addEmployee Migas Harris', client command received
				console.log("...Received ", command_string);
        let command_array = command_string.split(' ') // [ 'addEmployee', 'Migas', 'Harris' ]
        let result;
        if (command_array[0] == 'lookupById') {
          result = employeeModule.lookupById(parseInt(command_array[1])) //function called if lookupById
        } else if (command_array[0] == 'addEmployee') {
          result = employeeModule.addEmployee(command_array[1], command_array[2]) // function called if addEmployee
        } else if (command_array[0] == 'lookupByLastName') {
          result = employeeModule.lookupByLastName(command_array[1]) // function called lookupByLastName
        } else {
          result = "Invalid request"
        }

        socket.write(JSON.stringify(result)) // sends the result back to the client
			});

	});

// listen for client connections
server.listen(3000, () => {
	console.log(colors.red("Listening for connections"));
});

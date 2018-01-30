const net = require('net');
const readline = require('readline');
var colors = require('colors/safe'); //adding colors

const rl = readline.createInterface({ // setting up readline to use the user input
  input: process.stdin,
  output: process.stdout
});

const readMessage = (client) => {
	rl.question(colors.blue("Enter Command: "), (line) => { // reads command from console
			client.write(line);
			if (line == "bye") // command which will close the terminal
				client.end();
			else { // in half second, call readMessage again in a loop
				setTimeout(() => {
						readMessage(client);
					}, 500);
			};
	});
};

const client = net.connect({port:3000}, // states the port to connect in
	() => {
		console.log(colors.blue("Connected to server"));
		readMessage(client); // starts reading the command from the user
	});

client.on('end', () => {
	console.log(colors.blue("Client disconnected...")); // message when connection is closed
});

client.on('data', data => {
	console.log(colors.red("...Received\n"), colors.green(data.toString()));  // displays the data received
});

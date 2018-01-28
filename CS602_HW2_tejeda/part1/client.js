const net = require('net');
const readline = require('readline');
var colors = require('colors/safe'); //adding colors

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readMessage = (client) => {
	rl.question(colors.blue("Enter Command: "), (line) => {
			client.write(line);
			if (line == "bye")
				client.end();
			else {
				setTimeout(() => {
						readMessage(client);
					}, 500);
			};
	});
};

const client = net.connect({port:3000},
	() => {
		console.log(colors.blue("Connected to server"));
		readMessage(client);
	});

client.on('end', () => {
	console.log(colors.blue("Client disconnected..."));
});

client.on('data', data => {
	console.log(colors.red("...Received\n"), colors.green(data.toString()));
});

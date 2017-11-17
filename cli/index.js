'use strict';

// Native
var argv = require('yargs').argv;

// Convert arg value	s that look boolean to boolean
for (var arg in argv) {
	if (arg !== '$0' && typeof argv[arg] === 'string') {
		var val = argv[arg];
		if (val === 'true' || argv[arg] === 'false') {
			argv[arg] = (val === 'true');
		}
	}
}

var givenNamespace = argv._[0];
var givenName = argv._[1];

// Packages
var chalk = require('chalk');

// Ours
var paperspace = require('./../lib/paperspace');
const { handleError, error } = require('../lib/error');
const login = require('../lib/login');
const cfg = require('../lib/cfg');
const { version } = require('../lib/pkg');
const ua = require('../lib/ua');
const help = require('../lib/cmds');

const apiUrl = 'https://dev-api.paperspace.io/';
const shouldLogin = argv.login;

if (!givenNamespace && !givenName) {
	help()
	process.exit();
}


const stopDeployment = msg => {
	error(msg);
	process.exit(1);
};

async function main() {
	let config = await cfg.read({ token: argv.token });

	console.log(config);

	let token = argv.token || config.token;
	if (!token || shouldLogin) {
		try {
			token = await login(apiUrl);
			config = await cfg.read();
		} catch (err) {
			return stopDeployment(`Authentication error – ${err.message}`);
		}
		if (shouldLogin) {
			console.log('> Logged in successfully. Token saved in ~/.paperspace.json');
			return exit(0);
		}
	}
  //
	// // If we got to here then `token` should be set
	// try {
	// 	await create({ token, config });
	// 	// await sync({ token, config });
	// } catch (err) {
	// 	return stopDeployment(`Unknown error: ${err}\n${err.stack}`);
	// }
}

console.log(givenName);
console.log(givenNamespace);

if (givenNamespace == 'login') {
	main();
} else {

	var foundMethod;

	paperspace.eachEndpoint(function _each(namespace, name, method) {
		if (namespace === givenNamespace && name == givenName) {
			foundMethod = {
				namespace: namespace,
				name: name,
				method: method,
			};
		}
	});

	if (!foundMethod) {
		console.error('No such command `' + givenNamespace + ' ' + givenName + '`');
		process.exit(1);
	}

	if (argv.help) {
		help()
		process.exit();
	}

	function safeJSON(obj) {
		try {
			return JSON.stringify(obj, null, 2) + '\n';
		} catch (err) {
			console.error(err);
			return '{}';
		}
	}

	foundMethod.method(argv, function _methodCb(methodErr, methodResp) {
		if (methodErr) {
			process.stdout.write(
				safeJSON({
					error: methodErr.message,
					status: methodResp && methodResp.statusCode,
					response: methodResp && methodResp.body,
				})
			);

			process.exit(1);
		}

		process.stdout.write(safeJSON(methodResp.body || {}));
	});
}

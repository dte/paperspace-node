// Native
const os = require('os');

// Packages
const { stringify: stringifyQuery } = require('querystring');
const chalk = require('chalk');
const fetch = require('node-fetch');
const { validate } = require('email-validator');
const readEmail = require('email-prompt');
const ora = require('ora');
var prompt = require('prompt');
var qs = require('qs');

// Ours
// const pkg = require('./pkg');
const ua = require('./ua');
const cfg = require('./cfg');

function objectToQueryString(obj) {
	return qs.stringify(obj, { encode: false });
}

async function loginUser(url, email, password) {
	const data = objectToQueryString({
		email: email,
		password: password,
	});

	const res = await fetch(`${url}/users/login`, {
		method: 'POST',
		headers: {
			// "Content-Length": Buffer.byteLength(data),
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': ua,
		},
		body: data,
	});

	const body = await res.json();
	if (res.status !== 200) {
		throw new Error(
			`Verification error: ${res.status} – ${JSON.stringify(body)}`
		);
	}
	return body;
}

function sleep(ms) {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(resolve, ms);
		} catch (err) {
			reject(new Error('no idea'));
		}
	});
}

async function enterPassword() {
	return new Promise(function(resolve, reject) {
		var schema = {
			properties: {
				password: {
					hidden: true,
				},
			},
		};

		prompt.start();

		prompt.get(schema, function(err, result) {
			if (err) return reject(new Error('Password error'));
			resolve(result.password);
		});
	});
}

async function register(url, { retryEmail = false } = {}) {
	let email;
	try {
		email = await readEmail({ invalid: retryEmail });
	} catch (err) {
		process.stdout.write('\n');
		throw err;
	}

	process.stdout.write('\n');

	if (!validate(email)) {
		return register(url, { retryEmail: true });
	}

	let password;

	try {
		password = await enterPassword();
	} catch (err) {
		process.stdout.write('\n');
		throw err;
	}

	process.stdout.write('\n');

	const spinner = ora({
		text: 'Logging in...',
	}).start();

	let final;

	// await sleep(500);

	let user;
	try {
		user = await loginUser(url, email, password);
	} catch (err) {
		spinner.stop();
		throw new Error(`Couldn't retrieve user details ${err.message}`);
	}

	spinner.text = 'Successfully logged in!';
	spinner.stopAndPersist('✔');

	process.stdout.write('\n');

	// console.log(user);

	return {
		token: user.id,
		user: {
			email: user.user.email,
			id: user.user.id,
			teamId: user.user.teamId,
			handle: user.user.handle,
			firstName: user.user.firstName,
			lastName: user.user.lastName,
		},
		lastUpdate: Date.now(),
	};
}
module.exports = async function(url) {
	const loginData = await register(url);
	await cfg.merge(loginData);
	await cfg.remove('currentTeam'); // Make sure to logout the team too
	await cfg.remove('email'); // Remove old schema from previus versions
	return loginData.token;
};

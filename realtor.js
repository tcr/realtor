#!/usr/bin/env node

var rem = require('rem');
var colors = require('colors');
var async = require('async');

function codeStatus (callback) {
	return function (err, res) {
		callback(err, res.statusCode >= 200 && res.statusCode < 400, res.url);
	};
}

function contentStatus (regex, callback) {
	return function (err, res) {
		if (err) {
			callback(err);
		} else {
			rem.consume(res, function (content) {
				callback(err, !String(content).match(regex), res.url);
			});
		}
	};
}

var services = module.exports = {
	twitter: function (username, next) {
		rem.url('https://twitter.com/', username).get(codeStatus(next));
	},
	facebook: function (username, next) {
		rem.url('https://www.facebook.com/', username).get(codeStatus(next));
	},
	gmail: function (username, next) {
		rem.url('https://www.google.com/accounts/CheckAvailability', {Email: username}).get(contentStatus(/is available/, next));
	},
	reddit: function (username, next) {
		rem.url('https://www.reddit.com/user/', username).get(codeStatus(next));
	},
	hackernews: function (username, next) {
		rem.url('https://news.ycombinator.com/user', {id: username}).get(contentStatus(/No such user\./, next));
	},
	github: function (username, next) {
		rem.url('https://github.com/', username).get(codeStatus(next));
	},
	instagram: function (username, next) {
		rem.url('http://instagram.com/', username).get(codeStatus(next));
	},
	pinterest: function (username, next) {
		rem.url('http://pinterest.com/', username).get(codeStatus(next));
	}
};

if (require.main == module) {
	var username = process.argv[2];
	if (username === undefined) {
		console.error('Usage: realtor [username]');
		process.exit(1);
	}

	Object.keys(services).forEach(function (key) {
		services[key](username, function (err, available, url) {
			console.log((key + '                    ').substr(0, 12),
				available ? '[TAKEN] '.red : '[UNUSED]'.green,
				String(url).grey);
		});
	});
}
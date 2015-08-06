'use strict';

var Promise = require('any-promise');

/**
 * Allow your methods be called by Callbacks or Promises.
 *
 * @param err
 * @param [data]
 * @param [cb]
 * @returns {promise}
 */
var cbPromise = function (err, data, cb) {
	// CallBacks //
	if (cb) {
		if (err) {
			cb(err);
		}
		else {
			cb(null, data);
		}
		return null;
	}
	// Promises //
	return new Promise(function(resolve, reject) {
		if (err) {
			reject(err);
		} else {
			try {
				resolve(data);
			} catch(e) {
				reject(e);
			}
		}
	});
};

cbPromise.reject = function(err, cb) {
	return cbPromise(err, null, cb);
};

cbPromise.resolve = function(data, cb) {
	return cbPromise(null, data, cb);
};

module.exports = cbPromise;

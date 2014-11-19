'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Rawrecords3 = mongoose.model('Rawrecords3'),
	_ = require('lodash');

/**
 * Create a Rawrecords3
 */
exports.create = function(req, res) {
	var rawrecords3 = new Rawrecords3(req.body);
	rawrecords3.user = req.user;

	rawrecords3.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecords3);
		}
	});
};

/**
 * Show the current Rawrecords3
 */
exports.read = function(req, res) {
	res.jsonp(req.rawrecords3);
};

/**
 * Update a Rawrecords3
 */
exports.update = function(req, res) {
	var rawrecords3 = req.rawrecords3 ;

	rawrecords3 = _.extend(rawrecords3 , req.body);

	rawrecords3.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecords3);
		}
	});
};

/**
 * Delete an Rawrecords3
 */
exports.delete = function(req, res) {
	var rawrecords3 = req.rawrecords3 ;

	rawrecords3.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecords3);
		}
	});
};

/**
 * List of Rawrecords3s
 */
exports.list = function(req, res) { 
	Rawrecords3.find().sort('-created').populate('user', 'displayName').exec(function(err, rawrecords3s) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rawrecords3s);
		}
	});
};

/**
 * Rawrecords3 middleware
 */
exports.rawrecords3ByID = function(req, res, next, id) { 
	Rawrecords3.findById(id).populate('user', 'displayName').exec(function(err, rawrecords3) {
		if (err) return next(err);
		if (! rawrecords3) return next(new Error('Failed to load Rawrecords3 ' + id));
		req.rawrecords3 = rawrecords3 ;
		next();
	});
};

/**
 * Rawrecords3 authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rawrecords3.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

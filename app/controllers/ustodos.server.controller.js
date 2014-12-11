'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ustodo = mongoose.model('Ustodo'),
	_ = require('lodash');

/**
 * Create a Ustodo
 */
exports.create = function(req, res) {
	var ustodo = new Ustodo(req.body);
	ustodo.user = req.user;

	ustodo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo);
		}
	});
};

/**
 * Show the current Ustodo
 */
exports.read = function(req, res) {
	res.jsonp(req.ustodo);
};

/**
 * Update a Ustodo
 */
exports.update = function(req, res) {
	var ustodo = req.ustodo ;

	ustodo = _.extend(ustodo , req.body);

	ustodo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo);
		}
	});
};

/**
 * Delete an Ustodo
 */
exports.delete = function(req, res) {
	var ustodo = req.ustodo ;

	ustodo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodo);
		}
	});
};

/**
 * List of Ustodos
 */
exports.list = function(req, res) { 
	Ustodo.find().sort('-created').populate('user', 'displayName').exec(function(err, ustodos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ustodos);
		}
	});
};

/**
 * Ustodo middleware
 */
exports.ustodoByID = function(req, res, next, id) { 
	Ustodo.findById(id).populate('user', 'displayName').exec(function(err, ustodo) {
		if (err) return next(err);
		if (! ustodo) return next(new Error('Failed to load Ustodo ' + id));
		req.ustodo = ustodo ;
		next();
	});
};

/**
 * Ustodo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ustodo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

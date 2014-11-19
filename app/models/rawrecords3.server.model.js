'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rawrecords3 Schema
 */
var Rawrecords3Schema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Rawrecords3 name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Rawrecords3', Rawrecords3Schema);
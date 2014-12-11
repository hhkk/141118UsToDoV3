'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ustodo Schema
 */
var UstodoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Ustodo name',
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

mongoose.model('Ustodo', UstodoSchema);
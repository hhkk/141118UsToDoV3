'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Rawrecords3 = mongoose.model('Rawrecords3');

/**
 * Globals
 */
var user, rawrecords3;

/**
 * Unit tests
 */
describe('Rawrecords3 Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			rawrecords3 = new Rawrecords3({
				name: 'Rawrecords3 Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return rawrecords3.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			rawrecords3.name = '';

			return rawrecords3.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Rawrecords3.remove().exec();
		User.remove().exec();

		done();
	});
});
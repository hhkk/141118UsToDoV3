'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Rawrecords3 = mongoose.model('Rawrecords3'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, rawrecords3;

/**
 * Rawrecords3 routes tests
 */
describe('Rawrecords3 CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Rawrecords3
		user.save(function() {
			rawrecords3 = {
				name: 'Rawrecords3 Name'
			};

			done();
		});
	});

	it('should be able to save Rawrecords3 instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecords3
				agent.post('/rawrecords3s')
					.send(rawrecords3)
					.expect(200)
					.end(function(rawrecords3SaveErr, rawrecords3SaveRes) {
						// Handle Rawrecords3 save error
						if (rawrecords3SaveErr) done(rawrecords3SaveErr);

						// Get a list of Rawrecords3s
						agent.get('/rawrecords3s')
							.end(function(rawrecords3sGetErr, rawrecords3sGetRes) {
								// Handle Rawrecords3 save error
								if (rawrecords3sGetErr) done(rawrecords3sGetErr);

								// Get Rawrecords3s list
								var rawrecords3s = rawrecords3sGetRes.body;

								// Set assertions
								(rawrecords3s[0].user._id).should.equal(userId);
								(rawrecords3s[0].name).should.match('Rawrecords3 Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Rawrecords3 instance if not logged in', function(done) {
		agent.post('/rawrecords3s')
			.send(rawrecords3)
			.expect(401)
			.end(function(rawrecords3SaveErr, rawrecords3SaveRes) {
				// Call the assertion callback
				done(rawrecords3SaveErr);
			});
	});

	it('should not be able to save Rawrecords3 instance if no name is provided', function(done) {
		// Invalidate name field
		rawrecords3.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecords3
				agent.post('/rawrecords3s')
					.send(rawrecords3)
					.expect(400)
					.end(function(rawrecords3SaveErr, rawrecords3SaveRes) {
						// Set message assertion
						(rawrecords3SaveRes.body.message).should.match('Please fill Rawrecords3 name');
						
						// Handle Rawrecords3 save error
						done(rawrecords3SaveErr);
					});
			});
	});

	it('should be able to update Rawrecords3 instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecords3
				agent.post('/rawrecords3s')
					.send(rawrecords3)
					.expect(200)
					.end(function(rawrecords3SaveErr, rawrecords3SaveRes) {
						// Handle Rawrecords3 save error
						if (rawrecords3SaveErr) done(rawrecords3SaveErr);

						// Update Rawrecords3 name
						rawrecords3.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Rawrecords3
						agent.put('/rawrecords3s/' + rawrecords3SaveRes.body._id)
							.send(rawrecords3)
							.expect(200)
							.end(function(rawrecords3UpdateErr, rawrecords3UpdateRes) {
								// Handle Rawrecords3 update error
								if (rawrecords3UpdateErr) done(rawrecords3UpdateErr);

								// Set assertions
								(rawrecords3UpdateRes.body._id).should.equal(rawrecords3SaveRes.body._id);
								(rawrecords3UpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Rawrecords3s if not signed in', function(done) {
		// Create new Rawrecords3 model instance
		var rawrecords3Obj = new Rawrecords3(rawrecords3);

		// Save the Rawrecords3
		rawrecords3Obj.save(function() {
			// Request Rawrecords3s
			request(app).get('/rawrecords3s')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Rawrecords3 if not signed in', function(done) {
		// Create new Rawrecords3 model instance
		var rawrecords3Obj = new Rawrecords3(rawrecords3);

		// Save the Rawrecords3
		rawrecords3Obj.save(function() {
			request(app).get('/rawrecords3s/' + rawrecords3Obj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', rawrecords3.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Rawrecords3 instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rawrecords3
				agent.post('/rawrecords3s')
					.send(rawrecords3)
					.expect(200)
					.end(function(rawrecords3SaveErr, rawrecords3SaveRes) {
						// Handle Rawrecords3 save error
						if (rawrecords3SaveErr) done(rawrecords3SaveErr);

						// Delete existing Rawrecords3
						agent.delete('/rawrecords3s/' + rawrecords3SaveRes.body._id)
							.send(rawrecords3)
							.expect(200)
							.end(function(rawrecords3DeleteErr, rawrecords3DeleteRes) {
								// Handle Rawrecords3 error error
								if (rawrecords3DeleteErr) done(rawrecords3DeleteErr);

								// Set assertions
								(rawrecords3DeleteRes.body._id).should.equal(rawrecords3SaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Rawrecords3 instance if not signed in', function(done) {
		// Set Rawrecords3 user 
		rawrecords3.user = user;

		// Create new Rawrecords3 model instance
		var rawrecords3Obj = new Rawrecords3(rawrecords3);

		// Save the Rawrecords3
		rawrecords3Obj.save(function() {
			// Try deleting Rawrecords3
			request(app).delete('/rawrecords3s/' + rawrecords3Obj._id)
			.expect(401)
			.end(function(rawrecords3DeleteErr, rawrecords3DeleteRes) {
				// Set message assertion
				(rawrecords3DeleteRes.body.message).should.match('User is not logged in');

				// Handle Rawrecords3 error error
				done(rawrecords3DeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Rawrecords3.remove().exec();
		done();
	});
});
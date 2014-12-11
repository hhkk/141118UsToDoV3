'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ustodo = mongoose.model('Ustodo'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ustodo;

/**
 * Ustodo routes tests
 */
describe('Ustodo CRUD tests', function() {
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

		// Save a user to the test db and create new Ustodo
		user.save(function() {
			ustodo = {
				name: 'Ustodo Name'
			};

			done();
		});
	});

	it('should be able to save Ustodo instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo
				agent.post('/ustodos')
					.send(ustodo)
					.expect(200)
					.end(function(ustodoSaveErr, ustodoSaveRes) {
						// Handle Ustodo save error
						if (ustodoSaveErr) done(ustodoSaveErr);

						// Get a list of Ustodos
						agent.get('/ustodos')
							.end(function(ustodosGetErr, ustodosGetRes) {
								// Handle Ustodo save error
								if (ustodosGetErr) done(ustodosGetErr);

								// Get Ustodos list
								var ustodos = ustodosGetRes.body;

								// Set assertions
								(ustodos[0].user._id).should.equal(userId);
								(ustodos[0].name).should.match('Ustodo Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ustodo instance if not logged in', function(done) {
		agent.post('/ustodos')
			.send(ustodo)
			.expect(401)
			.end(function(ustodoSaveErr, ustodoSaveRes) {
				// Call the assertion callback
				done(ustodoSaveErr);
			});
	});

	it('should not be able to save Ustodo instance if no name is provided', function(done) {
		// Invalidate name field
		ustodo.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo
				agent.post('/ustodos')
					.send(ustodo)
					.expect(400)
					.end(function(ustodoSaveErr, ustodoSaveRes) {
						// Set message assertion
						(ustodoSaveRes.body.message).should.match('Please fill Ustodo name');
						
						// Handle Ustodo save error
						done(ustodoSaveErr);
					});
			});
	});

	it('should be able to update Ustodo instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo
				agent.post('/ustodos')
					.send(ustodo)
					.expect(200)
					.end(function(ustodoSaveErr, ustodoSaveRes) {
						// Handle Ustodo save error
						if (ustodoSaveErr) done(ustodoSaveErr);

						// Update Ustodo name
						ustodo.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ustodo
						agent.put('/ustodos/' + ustodoSaveRes.body._id)
							.send(ustodo)
							.expect(200)
							.end(function(ustodoUpdateErr, ustodoUpdateRes) {
								// Handle Ustodo update error
								if (ustodoUpdateErr) done(ustodoUpdateErr);

								// Set assertions
								(ustodoUpdateRes.body._id).should.equal(ustodoSaveRes.body._id);
								(ustodoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ustodos if not signed in', function(done) {
		// Create new Ustodo model instance
		var ustodoObj = new Ustodo(ustodo);

		// Save the Ustodo
		ustodoObj.save(function() {
			// Request Ustodos
			request(app).get('/ustodos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ustodo if not signed in', function(done) {
		// Create new Ustodo model instance
		var ustodoObj = new Ustodo(ustodo);

		// Save the Ustodo
		ustodoObj.save(function() {
			request(app).get('/ustodos/' + ustodoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ustodo.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ustodo instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ustodo
				agent.post('/ustodos')
					.send(ustodo)
					.expect(200)
					.end(function(ustodoSaveErr, ustodoSaveRes) {
						// Handle Ustodo save error
						if (ustodoSaveErr) done(ustodoSaveErr);

						// Delete existing Ustodo
						agent.delete('/ustodos/' + ustodoSaveRes.body._id)
							.send(ustodo)
							.expect(200)
							.end(function(ustodoDeleteErr, ustodoDeleteRes) {
								// Handle Ustodo error error
								if (ustodoDeleteErr) done(ustodoDeleteErr);

								// Set assertions
								(ustodoDeleteRes.body._id).should.equal(ustodoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ustodo instance if not signed in', function(done) {
		// Set Ustodo user 
		ustodo.user = user;

		// Create new Ustodo model instance
		var ustodoObj = new Ustodo(ustodo);

		// Save the Ustodo
		ustodoObj.save(function() {
			// Try deleting Ustodo
			request(app).delete('/ustodos/' + ustodoObj._id)
			.expect(401)
			.end(function(ustodoDeleteErr, ustodoDeleteRes) {
				// Set message assertion
				(ustodoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Ustodo error error
				done(ustodoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ustodo.remove().exec();
		done();
	});
});
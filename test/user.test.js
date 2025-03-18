const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming app.js is the entry point
const Event = require('../models/Event');

chai.use(chaiHttp);
chai.should();


describe('User Routes', () => {
  // Test user registration
  it('should register a new user', (done) => {
    const user = {
      username: 'testuser',
      password: 'password123'
    };

    chai.request(app)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User registered successfully');
        done();
      });
  });

  // Test user login
  it('should login a user', (done) => {
    const user = {
      username: 'testuser',
      password: 'password123'
    };

    chai.request(app)
      .post('/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});

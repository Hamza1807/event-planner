const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming app.js is the entry point
const Event = require('../models/Event');

chai.use(chaiHttp);
chai.should();


describe('Event Routes', () => {
  // Test event creation
  it('should create a new event', (done) => {
    const event = {
      name: 'Meeting with Bob',
      description: 'Discuss project updates',
      date: new Date(),
      category: 'Meetings'
    };

    chai.request(app)
      .post('/events')
      .send(event)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('Meeting with Bob');
        done();
      });
  });

  // Test viewing events
  it('should fetch all events', (done) => {
    chai.request(app)
      .get('/events')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

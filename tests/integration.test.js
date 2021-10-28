const request = require('supertest')
const app = require('../server/index.js')


describe('GET /reviews', function() {
  jest.setTimeout(20000)
  it('responds with json', function(done) {
    request(app)
      .get('/reviews')
      .query({product_id: 1})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
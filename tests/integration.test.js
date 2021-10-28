const supertest = require('supertest')
const {app, server, close} = require('../server/index.js')

const request = supertest(app)

beforeAll(done => {
  done()
})

afterAll((done) => {
  close(done)
})

describe('GET /reviews', function() {
  jest.setTimeout(25000)
  it('responds with json', async () => {
    let res = await
    request.get('/reviews')
      .query({product_id: 1})
      .set('Accept', 'application/json')
  expect(res.status).toBe(200)
    // request(app)
    //   .get('/reviews')
    //   .query({product_id: 1})
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(200, done);
  });
});

describe('GET /reviews/meta', function() {
  jest.setTimeout(20000)
  it('responds with json', async () => {
    let res = await
      request.get('/reviews/meta')
        .query({product_id: 1})
        .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    // request(app)
    //   .get('/reviews/meta')
    //   .query({product_id: 1})
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(200, done);
  });
});

describe('PUT /reviews/:review_id/helpful', function() {
  jest.setTimeout(20000)
  it('responds with 204', async () => {
    let res = await request.put('/reviews/1/helpful')
    expect(res.status).toBe(204)
  });
});

describe('PUT /reviews/:review_id/report', function() {
  jest.setTimeout(20000)
  test('responds with 204', async () => {
    let res = await request.put('/reviews/1/report')
    expect(res.status).toBe(204)
  });
});
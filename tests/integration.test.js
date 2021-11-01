const supertest = require('supertest')
const {app, server, close} = require('../server/index.js')

const request = supertest(app)

afterAll((done) => {
  close(done)
})

describe('GET /reviews', function() {
  it('responds with json', async () => {
    let res = await
    request.get('/reviews')
      .query({product_id: 1})
      .set('Accept', 'application/json')
  expect(res.status).toBe(200)
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
  test('responds with 204', async () => {
    let res = await request.put('/reviews/1/report')
    expect(res.status).toBe(204)
  });
});
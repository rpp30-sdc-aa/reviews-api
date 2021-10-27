const { getReviews } = require('../../controllers')

describe('Database Controllers', function () {
  describe('Reviews', function() {
    jest.setTimeout(20000)
    test('Should get reviews for a given product_id', async function () {
      const reviews = await getReviews('1')
      for (let i = 0; i < reviews.length; i++) {
        expect(typeof reviews[i].product_id).toBe('string')
        expect(typeof reviews[i].rating).toBe('number')
        expect(reviews[i].date).toBeInstanceOf(Date)
        expect(typeof reviews[i].summary).toBe('string')
        expect(typeof reviews[i].body).toBe('string')
        expect(typeof reviews[i].recommend).toBe('boolean')
        expect(typeof reviews[i].reported).toBe('boolean')
        expect(typeof reviews[i].reviewer_name).toBe('string')
        expect(typeof reviews[i].reviewer_email).toBe('string')
        expect(reviews[i].response).toBeNull();
        expect(typeof reviews[i].helpfulness).toBe('number')
      }
    })
  })
})
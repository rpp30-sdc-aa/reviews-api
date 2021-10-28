const { getReviews, postReviews } = require('../controllers')
const { Review } = require('../models/index.js')

describe('Database Controllers', function () {
  describe('Reviews', function() {
    jest.setTimeout(10000)
    test('Should get reviews for a given product_id', async function () {
      try {
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
      } catch (err) {
        expect(err).toBeNull()
      }
    })

    test('Should post a review to the database', async function () {
      const reviewData = {
        "product_id": "1",
        "rating": 5,
        "date": new Date('2020-07-30T03:41:21.467Z'),
        "summary": "This product was great!",
        "body": "I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",
        "recommend": true,
        "name": "funtime",
        "email": "first.last@gmail.com",
      }

      try {
        let review = await postReviews(reviewData)
        let expectedReview = await Review.findByPk(review.id)
        expect(review.toJSON()).toEqual(expectedReview.toJSON())
      } catch (err) {
        console.log(err)
        expect(err).toBeNull()
      }
    })
  })
})
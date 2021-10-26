const express = require('express')
const app = express()
const { getReviews, putHelpful } = require('../controllers/index.js')

app.get('/reviews', async (req, res) => {
  try {
    const { page, product_id, limit } = req.query;
    let reviews = await getReviews(product_id, limit, page)
    res.json({
      product: product_id,
      page,
      count: reviews.length,
      results: reviews
    })
  } catch(err) {
    console.log(err)
    res.send(500, `Failed to fetch reviews... ${err}`)
  }
});

app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query;

  // {
  //   "product_id": "2",
  //   "ratings": {
  //     2: 1,
  //     3: 1,
  //     4: 2,
  //     // ...
  //   },
  //   "recommended": {
  //     0: 5
  //     // ...
  //   },
  //   "characteristics": {
  //     "Size": {
  //       "id": 14,
  //       "value": "4.0000"
  //     },
  //     "Width": {
  //       "id": 15,
  //       "value": "3.5000"
  //     },
  //     "Comfort": {
  //       "id": 16,
  //       "value": "4.0000"
  //     },
  //     // ...
  // }
  res.send(200, 'Work in progress...')
})

app.post('/reviews', async (req, res) => {

// product_id	integer	Required ID of the product to post the review for
// rating	int	Integer (1-5) indicating the review rating
// summary	text	Summary text of the review
// body	text	Continued or full text of the review
// recommend	bool	Value indicating if the reviewer recommends the product
// name	text	Username for question asker
// email	text	Email address for question asker
// photos	[text]	Array of text urls that link to images to be shown
// characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}

res.send(200, 'Work in progress...')
})

app.put('/reviews/:review_id/helpful', async (req, res) => {

  try {
    await putHelpful(req.params.review_id)
    res.sendStatus(204)
  } catch (err) {
    res.send(500, err)
  }
})

app.put('/reviews/:review_id/report', async (req, res) => {

  //Status: 204 NO CONTENT

  res.send(200, 'Work in progress...')
})

app.listen(3005, () => {console.log('Server started....')})
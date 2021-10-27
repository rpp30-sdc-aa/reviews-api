const express = require('express')
const app = express()
const {
  getReviews,
  putHelpful,
  putReport,
  getCharacteristics,
  postReviews,
  getMetaData} = require('../controllers/index.js')

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

  try {
    res.json(await getMetaData(product_id))
  } catch (err) {
    res.status(500).json(err)
  }
})

app.post('/reviews', async (req, res) => {
  try {
    await postReviews(req.query)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json(err)
  }
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
  try {
    await putReport(req.params.review_id)
    res.sendStatus(204)
  } catch (err) {
    res.send(500, err)
  }
})

app.get('/characteristics/:review_id', async (req, res) => {
  try{
    res.json(await getCharacteristics(req.params.review_id))
  } catch (err) {
    res.status(500).send(JSON.stringify(err))
  }
})

app.listen(3005, () => {console.log('Server started....')})
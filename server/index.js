const express = require('express')
const app = express()
const { getReviews } = require('../controllers/index.js')


app.get('/reviews', async (req, res) => {
  try {
    const { page, product_id, limit } = req.query;
    let reviews = await getReviews(product_id, limit, page)
    res.json({
      product: product_id,
      page,
      count: reviews.rows.length,
      results: reviews.rows
    })
  } catch(err) {
    console.log(err)
    res.send(500, `Failed to fetch reviews... ${err}`)
  }
});

app.listen(3005, () => {console.log('Server started....')})
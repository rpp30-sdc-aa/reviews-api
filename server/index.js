const express = require('express')
const app = express()
const { getReviews } = require('../controllers/index.js')


app.get('/reviews', async (req, res) => {
  try {
    const { page, product_id, limit } = req.query;
    let reviews = await getReviews(product_id, limit, page)
    res.json({
      product_id,
      page,
      reviews
    })
  } catch(err) {
    console.log(error)
    res.status(500).send('Failed to fetch reviews...', err)
  }
});

app.listen(3005, () => {console.log('Server started....')})
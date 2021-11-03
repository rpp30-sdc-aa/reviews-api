require('dotenv').config()
const express = require('express')
const app = express()
const {
  getReviews,
  putHelpful,
  putReport,
  getCharacteristics,
  postReviews,
  getMetaData, sequelize } = require('../controllers/index.js')

let port = process.env.PORT

if (process.env.NODE_ENV === 'production') {
  port = 80
}

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
  } catch (err) {
    console.log(err)
    res.send(500, `Failed to fetch reviews... ${err}`)
  }
});

app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query;

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
    res.status(500).json(err)
  }
})

app.put('/reviews/:review_id/report', async (req, res) => {
  try {
    await putReport(req.params.review_id)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get('/characteristics/:review_id', async (req, res) => {
  try {
    res.json(await getCharacteristics(req.params.review_id))
  } catch (err) {
    res.status(500).send(JSON.stringify(err))
  }
})

const server = app.listen(port, () => { console.log('Server started at', port) })

module.exports = {
  app,
  server,
  close: (next) => {
    server.close(async () => {
      await sequelize.close()
      next()
    })
  }
}
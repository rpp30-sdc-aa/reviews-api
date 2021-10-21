const { Reviews } = require('../models/index.js')

module.exports.getReviews = async (product_id, limit = 5, page = 1) => {
  return new Promise((resolve, reject) => {
    const offset = page * limit;
    try {
      let reviews = await Reviews.findAndCountAll({
        where: {
          product_id
        },
        limit,
        offset
      })
      resolve(reviews)
    } catch(err) {
      reject(err)
    }
  })
}
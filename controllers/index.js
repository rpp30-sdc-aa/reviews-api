const { Review, Photo } = require('../models/index.js')

module.exports.getReviews = (product_id, limit = 5, page = 0) => {
  return new Promise(async (resolve, reject) => {
    const offset = (page > 1) ? page * limit : 0;
    try {
      let returnedReviews = await Review.findAndCountAll({
        where: {
          product_id
        },
        limit,
        offset,
        include: Photo
      })
      resolve(returnedReviews)
    } catch(err) {
      reject(err)
    }
  })
}
const { Review, Photo, Characteristic, Characteristic_Review } = require('../models/index.js')

module.exports.getReviews = (product_id, limit = 5, page = 0) => {
  return new Promise(async (resolve, reject) => {
    const offset = (page > 1) ? page * limit : 0;
    let rows = []
    try {
      let returnedReviews = await Review.findAndCountAll({
        where: {
          product_id
        },
        limit,
        offset,
        include: [{ model: Photo, separate: true, attributes: ['id', 'url'] } ]
      })

      for (let review of returnedReviews.rows) {
        let entries = []
        let characteristicsEntry = await Characteristic_Review.findAll({ where: { review_id: review.id }, attributes: ['value', 'id'] })
        for (let entry of characteristicsEntry) {
          entryObj = entry.toJSON()
          let characteristicName = await Characteristic.findByPk(entryObj.id)
          charObj = characteristicName.toJSON()
          entryObj.name = charObj.name
          delete entryObj.id
          entries.push(entryObj)
        }
        reviewObj = review.toJSON()
        reviewObj.characteristics = [...entries]
        rows.push(reviewObj)
      }
      resolve(rows)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports.putHelpful = (review_id) => {
  return new Promise (async (resolve, reject) => {
    try {
      await Review.increment('helpfulness',{
        where: {
          id: review_id
        }
      })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
const { response } = require('express');
const { Review,
        Photo,
        Characteristic,
        Characteristic_Review,
        sequelize } = require('../models/index.js')

module.exports.sequelize = sequelize;

module.exports.getReviews = (product_id, limit = 5, page = 0, sort) => {
  let order = [
    ['date', 'DESC']
  ]
  if (sort === 'helpfulness') {
    order = [
      ['helpfulness', 'DESC']
    ]
  }

  if (sort === 'relevent') {
    order = [
      ['rating', 'DESC']
    ]
  }

  return new Promise(async (resolve, reject) => {
    const offset = (page > 1) ? page * limit : 0;

    try {
      let returnedReviews = await Review.findAndCountAll({
        where: {
          product_id
        },
        limit,
        offset,
        order,
        attributes: [['id', 'review_id'], 'product_id', 'rating', 'date', 'summary', 'body', 'recommend', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness']
        // include: [{ model: Photo, separate: true, attributes: ['id', 'url'] } ]
        // removed. this method is slower for any non one-one relations than just querying Photo model
      })

      // get photos and characteristic

      const characteristicPromises = []
      const photosPromises = []
      const reviews = []
      for (let review of returnedReviews.rows) {
        reviews.push(review.toJSON())
        photosPromises.push(Photo.findAll({ where: { review_id: review.dataValues.review_id }}))
        characteristicPromises.push(module.exports.getCharacteristics(review.dataValues.review_id))
      }
      const photos = await Promise.all(photosPromises)
      const characteristics = await Promise.all(characteristicPromises)

      for (let i = 0; i < reviews.length; i++) {
        reviews[i].photos = photos[i]
        reviews[i].characteristics = characteristics[i]
      }
      resolve(reviews)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports.postReviews = (queryParams) => {
  const {
    product_id, // int
    rating, // int
    summary, // text
    body, // text
    recommend, // bool
    name, // text
    email, // text
    photos, // array of text
    characteristics // obj {char_id: value}
  } = queryParams

  return new Promise (async (resolve, reject) => {
    try {
      let review = await Review.create({
        product_id: product_id,
        rating: rating,
        summary: summary,
        body: body,
        recommend: recommend,
        reviewer_name: name,
        reviewer_email: email
      })

      // now post the photos
      if (photos !== undefined) {
        const photoPromises = []
        for (let photo of photos) {
          photoPromises.push(Photo.create({
            review_id: review.id,
            url: photo
          }))
        }
        await Promise.all(photoPromises)
      }

      // now post the characteristics
      if (characteristics !== undefined) {
        const characteristicPromises = []
        for (key in characteristics) {
          characteristicPromises.push(Characteristic_Review.create({
            characteristic_id: characteristics[key].id,
            review_id: review.id,
            value: characteristics[key].value
          }))
        }
        await Promise.all(characteristicPromises)
      }

      resolve(review)
    } catch (err) {
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

module.exports.putReport = (review_id) => {
  return new Promise (async (resolve, reject) => {
    try {
      let review = await Review.findByPk(review_id);
      if (!review.reported) {
        review.reported = true;
        await review.save()
      }
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

module.exports.getCharacteristics = (review_id) => {
  return new Promise (async (resolve, reject) => {
    try {
      let characteristicsList = {}
      let characteristicPromises = []
      let characteristicsJoins = await Characteristic_Review.findAll({
        where: {
          review_id
        }
      })

      for (let i = 0; i < characteristicsJoins.length; i++) {
        let id = characteristicsJoins[i].characteristic_id
        characteristicPromises.push(
          Characteristic.findByPk(id)
        )
      }
      let characteristics = await Promise.all(characteristicPromises)

      for (let j = 0; j < characteristics.length; j++) {
        characteristicsList[characteristics[j].name] = {
          id: characteristics[j].id,
          value: characteristicsJoins[j].value
        }
      }
      resolve(characteristicsList)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports.getMetaData = (product_id) => {
  return new Promise(async (resolve, reject) => {
    const metaData = {
      product_id,
      ratings: {},
      characteristics: {},
      recommended: {
        0: 0
      }
    }
    const characteristicPromises = []
    try {
      let reviews = await Review.findAll({
        where: {
          product_id
        }
      })

      for (let review of reviews) {
        (metaData.ratings[review.rating]) ?
          metaData.ratings[review.rating] += 1 : metaData.ratings[review.rating] = 1;
        if (review.recommend) {
          metaData.recommended[0] += 1
        }
        characteristicPromises.push(module.exports.getCharacteristics(review.id))
      }

      // finish getting all the characteristics
      let characteristics = await Promise.all(characteristicPromises)

      for (let entry of characteristics) {
        const keys = Object.keys(entry)
        for (let key of keys) {
          if (metaData.characteristics[key] === undefined) {
            metaData.characteristics[key] = {
              id: entry[key].id,
              value: [entry[key].value]
            }
          } else {
            metaData.characteristics[key].value.push(entry[key].value)
          }
        }
      }
      // finally, get the averages for the characteristic values
      let characteristicKeys = Object.keys(metaData.characteristics)
      for (let key of characteristicKeys) {
        let array = metaData.characteristics[key].value
        metaData.characteristics[key].value =
          (array.reduce((a, b) => a + b) / array.length).toFixed(4)
      }

      resolve(metaData)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
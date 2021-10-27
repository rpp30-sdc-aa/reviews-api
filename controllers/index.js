const { Review, Photo, Characteristic, Characteristic_Review } = require('../models/index.js')

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
        include: [{ model: Photo, separate: true, attributes: ['id', 'url'] } ]
        //TODO: refactor to manual query
      })

      const characteristicPromises = []
      const reviews = []
      for (let review of returnedReviews.rows) {
        reviews.push(review.toJSON())
        characteristicPromises.push(module.exports.getCharacteristics(review.id))
      }
      const characteristics = await Promise.all(characteristicPromises)

      for (let i = 0; i < reviews.length; i++) {
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
        product_id,
        rating,
        summary,
        body,
        recommend,
        reviewer_name: name,
        reviewer_email: email
      })

      // now post the photos
      const photoPromises = []
      for (photo of photos) {
        photoPromises.push(Photo.create({
          review_id: review.id,
          url: photo
        }))
      }
      await Promise.all(photoPromises)

      // now post the characteristics
      const characteristicPromises = []
      for (key in characteristics) {
        characteristicPromises.push(Characteristic_Review.create({
          characteristic_id: characteristics[key].id,
          review_id: review.id,
          value: characteristics[key].value
        }))
      }
      await Promise.all(characteristicPromises)
      resolve()
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
    const ratings = {}
    try {
      let reviews = await Review.findAll({
        where: {
          product_id
        }
      })

      for (let review of reviews) {
        (ratings[review.rating]) ? ratings[review.rating] += 1 : ratings[review.rating] = 1;
      }
      console.log(ratings)
      resolve(ratings)
    } catch (err) {
      reject(err)
    }
  })
}
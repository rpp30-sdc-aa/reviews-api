'use strict';
const path = require('path')
const { seedDatabaseFromCSVFast } =  require('./utils/utils.js')


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transformCallBack = data => {
      const { id, characteristic_id, review_id, value } = data;
      return {
        id: Number(id),
        characteristic_id: Number(characteristic_id),
        review_id: Number(review_id),
        value: Number(value),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    }

    try {
      let rowCount = await seedDatabaseFromCSVFast(
        path.resolve(__dirname, 'sample', 'characteristic_reviews.csv'),
        'characteristic_reviews',
        queryInterface,
        transformCallBack
      )

      console.log('Write completed', rowCount)

    } catch(err) {
      console.log(err)
    }

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('characteristic_reviews', null, {});
  }
};
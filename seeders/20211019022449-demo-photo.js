'use strict';
const path = require('path')
const { seedDatabaseFromCSV, seedDatabaseFromCSVFast } =  require('./utils/utils.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transformCallBack = data => {
      return {
        id: Number(data.id),
        review_id: Number(data.review_id),
        url: data.url
      }
    }

    try {
      let rowCount = await seedDatabaseFromCSVFast(
        path.resolve(__dirname, 'sample', 'reviews_photos.csv'),
        'photos',
        queryInterface,
        transformCallBack
      )

      console.log('Write completed', rowCount)
    } catch(err) {
      console.log(err)
    }

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('photos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

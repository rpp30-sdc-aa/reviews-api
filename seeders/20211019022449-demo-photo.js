'use strict';
const path = require('path')
const { seedDatabaseFromCSV } =  require('./utils/utils.js')

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
      let rowsAdded = await seedDatabaseFromCSV(
        path.resolve(__dirname, 'sample', 'reviews_photos.csv'),
        queryInterface,
        'photos',
        100000,
        transformCallBack
      )

      console.log('Database seed complete. Rows added: ', rowsAdded)
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

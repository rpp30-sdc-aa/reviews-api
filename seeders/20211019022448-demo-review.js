'use strict';
const path = require('path')
const { seedDatabaseFromCSV } =  require('./utils/utils.js')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transformCallBack = data => {
      let {date, id, rating, helpfulness, recommend, reported, response, ...rest} = data
      return {
        date: new Date(Number(date)),
        id: Number(id),
        rating: Number(rating),
        helpfulness: Number(helpfulness),
        recommend: recommend === 'true',
        reported: reported === 'true',
        response: (response === 'null' ? null : response),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
         ...rest}
    }

    try {
      let rowsAdded = await seedDatabaseFromCSV(
        path.resolve(__dirname, 'sample', 'reviews.csv'),
        queryInterface,
        'reviews',
        100000,
        transformCallBack
      )
      console.log('Database seed complete. Rows added: ', rowsAdded)
    } catch(err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};

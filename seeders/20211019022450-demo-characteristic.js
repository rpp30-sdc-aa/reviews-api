'use strict';
const path = require('path')
const { seedDatabaseFromCSV } =  require('./utils/utils.js')


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transformCallBack = data => {
      const {id, ...rest} = data;
      return {
        id: Number(id),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        ...rest
      }
    }

    try {
      let rowsAdded = await seedDatabaseFromCSV(
        path.resolve(__dirname, 'sample', 'characteristics.csv'),
        queryInterface,
        'characteristics',
        100000,
        transformCallBack
      )

      console.log('Database seed complete. Rows added: ', rowsAdded)
    } catch(err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};

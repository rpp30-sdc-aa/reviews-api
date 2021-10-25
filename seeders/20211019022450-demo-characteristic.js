const path = require('path')
const { seedDatabaseFromCSVFast } =  require('./utils/utils.js')

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
      let rowCount = await seedDatabaseFromCSVFast(
        path.resolve(__dirname, 'sample', 'characteristics.csv'),
        'characteristics',
        queryInterface,
        transformCallBack
      )
      console.log('Write completed', rowCount)
    } catch(err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('characteristics', null, {});
  }
};

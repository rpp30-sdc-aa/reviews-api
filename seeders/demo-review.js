'use strict';
const path = require('path')
const { parseToObjectArray } =  require('./utils/utils.js')


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

    let end = null
    let current = 0
    let maxRows = 10000

    while(!end) {
      try {
        let data = await parseToObjectArray(path.resolve(__dirname, 'sample', 'reviews.csv'), maxRows, current, transformCallBack)
        await queryInterface.bulkInsert('Reviews', data.bulkInsertArr)
        end = data.end
        current += maxRows
        console.log(current)
      } catch(err) {
        console.log(err)
        end = true
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

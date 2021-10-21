'use strict';
const fs = require('fs')
const csv = require('@fast-csv/parse')

const getCSVArray = (path, start) => {
  return new Promise((resolve, reject) => {
    let bulkInsertArr = []

    csv.parseFile(path, {headers: true, maxRows: 5000, skipRows: start})
      .transform(data => {
        let {date, id, rating, helpfulness, recommend, reported, response, ...rest} = data
        return {
          date: new Date(Number(date)),
          id: Number(id),
          rating: Number(rating),
          helpfulness: Number(helpfulness),
          recommend: recommend === 'true',
          reported: reported === 'true',
          response: (response === 'null' ? null : response),
           ...rest}
      })
      .on('error', error => reject(error))
      .on('data', row => bulkInsertArr.push(row))
      .on('end', (rowCount) => {
        let end = null
        if (rowCount < 5000) {
          end = true
        }
        resolve({bulkInsertArr, end})});
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let end = null
    let current = 0
    while(!end) {
      try {
        let data = await getCSVArray('/Users/alexanderolvera/code/SDC/reviews-api/seeders/sample/reviews.csv', current)
        await queryInterface.bulkInsert('Reviews', data.bulkInsertArr)
        end = data.end
        current += 5000
        console.log(current)
      } catch(err) {
        console.log(err)
        end = true
      }
    }
    // console.log(data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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

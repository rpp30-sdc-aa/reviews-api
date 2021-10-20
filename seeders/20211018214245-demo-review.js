'use strict';
const fs = require('fs')
const csv = require('@fast-csv/parse')

const getCSVArray = (path) => {
  return new Promise((resolve, reject) => {
    let bulkInsertArr = []
    csv.parseFile(path, {headers: true, maxRows: 200})
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
      .on('end', () => resolve(bulkInsertArr));
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let data = await getCSVArray('/Users/alex/code/reviews-api/seeders/sample/reviews.csv')
    // console.log(data)
    return queryInterface.bulkInsert('Reviews', data)
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

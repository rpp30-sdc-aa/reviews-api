'use strict';
const fs = require('fs')
const csv = require('@fast-csv/parse')

const getCSVArray = (path) => {
  return new Promise((resolve, reject) => {
    let bulkInsertArr = []
    csv.parseFile(path, {headers: true, maxRows:10})
      .transform(data => ({
        id: Number(data.id),
        review_id: Number(data.review_id),
        url: data.url
      }))
      .on('error', error => reject(error))
      .on('data', row => bulkInsertArr.push(row))
      .on('end', () => resolve(bulkInsertArr));
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = await getCSVArray('/Users/alex/code/reviews-api/seeders/sample/reviews_photos.csv')
    data.shift()
    return queryInterface.bulkInsert('Photos', data)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

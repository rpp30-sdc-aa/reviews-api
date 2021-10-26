const fs = require('fs')
const { parse } = require('@fast-csv/parse')

module.exports.seedDatabaseFromCSVFast = (path, table, queryInterface, transformCB = data => data) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let bulkInsert = []
    const stream = fs.createReadStream(path)
      .pipe(parse({headers: true}).transform(transformCB))
      .on('error', error => reject(error))
      .on('data', async row => {
        if (bulkInsert.length >= 5000) {
          stream.pause();
          try {
            bulkInsert.push(row)
            await queryInterface.bulkInsert(table, bulkInsert)
            count += bulkInsert.length
            bulkInsert = []
            stream.resume();
          } catch (err) {
            reject(err)
          }
        } else {
          bulkInsert.push(row)
        }
      })
      .on('end', async rowCount => {
        if (bulkInsert.length > 0) {
          try {
            await queryInterface.bulkInsert(table, bulkInsert)
            count += bulkInsert.length
          } catch(err) {
            reject(err)
          }
        }
        resolve(count)
      });
  })
}

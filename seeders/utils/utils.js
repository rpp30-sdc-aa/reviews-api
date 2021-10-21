const fs = require('fs')
const csv = require('@fast-csv/parse')

module.exports.parseToObjectArray = (path, max = 5000, start = 0, transformCB = data => data) => {
  return new Promise((resolve, reject) => {
    let bulkInsertArr = []

    csv.parseFile(path, {headers: true, maxRows: max, skipRows: start})
      .transform(transformCB)
      .on('error', error => reject(error))
      .on('data', row => bulkInsertArr.push(row))
      .on('end', rowCount => {resolve({bulkInsertArr, rowCount})});
  })
}

module.exports.seedDatabaseFromCSV = async (path, queryInterface, maxRows = 5000, transformCallBack) => {
  return new Promise((resolve, reject) => {
    let end = null
    let current = 0

    while(!end) {
      try {
        let {bulkInsertArr, rowCount} = await parseToObjectArray(path, maxRows, current, transformCallBack)
        await queryInterface.bulkInsert('Reviews', bulkInsertArr)
        current += data.rowCount
        console.log(current)
        if (rowCount < maxRows) {
          end = true
        }
      } catch(err) {
        end = true
        reject(err)
      }
    }
    resolve(current)
  })
}
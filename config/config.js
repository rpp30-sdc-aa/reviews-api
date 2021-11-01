require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD || null,
    "database": process.env.DBNAME,
    "host": process.env.DBURL,
    "dialect": "postgres",
    "logging": false,
  },
  "test": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBURL,
    "dialect": "postgres",
    "logging": false,
  },
  "production": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBURL,
    "dialect": "postgres",
    "logging": false,
  }
}
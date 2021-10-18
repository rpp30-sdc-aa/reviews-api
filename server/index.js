const express = require('express')

const app = express()

const db = require('../models/index.js');

app.listen(3005, () => {console.log('Server started....')})
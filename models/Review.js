const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('.')

class Review extends Model {}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW()
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ' '
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ' '
  },
  recommend: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  reported: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  reviewer_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  reviewer_email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  helpfulness: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {sequelize, modelName: 'Review'})

module.exports = Review;
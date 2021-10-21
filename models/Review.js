const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Photo)
    }
  }

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
      defaultValue: Date.now()
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
  }, {underscored: true,
      sequelize,
      modelName: 'Review',
      tableName: 'reviews'})

  return Review;
}
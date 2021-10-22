const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Characteristic_Review extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Characteristic)
      this.hasMany(models.Review)
    }
  }

  Characteristic_Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    characteristic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {underscored: true,
      sequelize,
      modelName: 'Characteristic_Review',
      tableName: 'characteristic_reviews'})

  return Characteristic_Review;
}
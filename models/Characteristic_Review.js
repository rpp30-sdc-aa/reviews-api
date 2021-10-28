const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Characteristic_Review extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Characteristic, {
        foreignKey: 'id'
      })
      this.hasMany(models.Review, {
        foreignKey: 'id'
      })

      // needs more testing to define associationg for return
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
  }, {
      sequelize,
      modelName: 'Characteristic_Review',
      tableName: 'characteristic_reviews',
      timestamps: false
  })

  return Characteristic_Review;
}
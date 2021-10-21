'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Review)
    }
  };
  Photo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    underscored: true,
    sequelize,
    modelName: 'Photo',
    tableName: 'photos'
  });
  return Photo;
};
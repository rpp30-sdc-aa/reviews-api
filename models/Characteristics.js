const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Characteristic extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Review, {
        through: models.Characteristic_Review,
        foreignKey: 'characteristic_id'
      })
    }
  }

  Characteristic.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {underscored: true,
      sequelize,
      modelName: 'Characteristic',
      tableName: 'characteristics'})

  return Characteristic;
}
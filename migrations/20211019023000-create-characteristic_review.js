'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;

    await queryInterface.createTable('characteristic_reviews', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      characteristic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'characteristics', key: 'id'}
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'reviews', key: 'id'}
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
    await queryInterface.addIndex('characteristic_reviews', ['review_id'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characteristic_reviews');
  }
};
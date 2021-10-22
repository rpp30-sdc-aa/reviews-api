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
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characteristic_reviews');
  }
};
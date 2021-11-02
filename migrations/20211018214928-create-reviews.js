'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Date.now()
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ' '
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ' '
      },
      recommend: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      reported: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      reviewer_name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      reviewer_email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      response: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      helpfulness: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

    await queryInterface.addIndex('reviews', ['product_id'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  }
};
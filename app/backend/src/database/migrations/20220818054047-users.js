'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
};
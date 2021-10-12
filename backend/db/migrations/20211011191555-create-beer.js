'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Beers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(80)
      },
      description: {
        type: Sequelize.STRING(750)
      },
      abv: {
        type: Sequelize.NUMERIC(2, 1)
      },
      ibu: {
        type: Sequelize.INTEGER
      },
      beerImg: {
        type: Sequelize.STRING
      },
      breweryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Breweries" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Beers');
  }
};
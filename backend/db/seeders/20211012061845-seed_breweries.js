'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomBreweries() {
  const breweryNames = [
    "Founders",
    "Structures",
    "Heineken",
    "Anheuser Busch",
    "Coors",
    "Miller",
    "Tree House Brewing",
    "Fremont Brewing",
    "Trillium Brewing",
    "Lawson's Finest Liquids"

  ]
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

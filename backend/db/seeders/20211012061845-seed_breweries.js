'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomBreweries() {
  const breweryNames = [
    "Founders Brewing",
    "Structures Brewing",
    "Heineken",
    "Anheuser Busch",
    "Coors",
    "Corona",
    "Miller",
    "Tree House Brewing",
    "Fremont Brewing",
    "Trillium Brewing",
    "Lawson's Finest Liquids",
    "Peticolas Brewing",
    "Firestone Walker",
    "Bells Brewing",
    "Old Nation Brewing",
  ];
  let breweryNum = getRandomNum(0, breweryNames.length);
  return breweryNames[breweryNum];
}

const breweries = [];

for (let i = 0; i <= 50; i++) {
  let newBrewery = {
    name: `${randomBreweries()}`,
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
  };
  breweries.push(newBrewery);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Breweries', breweries, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Breweries', null, {});
  }
};

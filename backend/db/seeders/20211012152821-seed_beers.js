'use strict';
const faker = require("faker");

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomDescriptions() {
  const descriptions = [
    "NE Style Hazy IPA",
    "Basic Lager",
    "Red Ale",
    "Barrel-aged stout",
    "Sour",
    "Gose",
    "Coffee Stout",
    "Pilsner",
    "Classic Ale",
    "West Coast IPA",
    "American IPA",
    "Wild Ale",
    "Fresh-Hopped IPA",
    "Milk-Stout"
  ];
  let descriptionNum = getRandomNum(0, descriptions.length);
  return descriptions[descriptionNum];
}

function randomFrontWords() {
  const frontWords = [
    "Velvet",
    "Nectar",
    "Hop To It",
    "Boar's",
    "Festival",
    "Super",
    "Sunshine",
    "Juicy",
    "Break The",
    "Crushable",
    "Best",
    "Enchiladas In A",
    "Key Lime",
    "Apple",
    "Smells Like",
    "Basic Beer",
    "Pretty",
    "Marvelous",
    "Fresh",
    "Serious",
    "Bourbony",
    "Top Of Tha",
    "Tasty",
    "Cinnamon Toast And",
    "Oatmeal Raisin",
    "Marshmallow",
    "50",
    "One Buck",
    "Mash The",
    "Gravy On The",
    "It Will Give You",
    "Kiss The",
    "Walks The",
    "Grapefruit"
  ]
  let frontNum = getRandomNum(0, frontWords.length);
  return frontWords[frontNum];
}

function randomEndNames() {
  const endWords = [
    "Hammer",
    "Of The Gods",
    "Hop To It",
    "Light",
    "Festbier",
    "Hops",
    "Feels",
    "Juice",
    "Crushable",
    "Lagerita",
    "Enchiladas",
    "Pie",
    "Fritters",
    "House",
    "Places",
    "Coast",
    "Sips",
    "Street",
    "Mornin'",
    "Syrup",
    "In A Can",
    "Cereal",
    "The Tun",
    "Mash",
    "Worts",
    "Frog",
    "Dog",
    "Tater Tots",
    "Shandy",
    "Stout",
    "Lager",
    "Ale",
    "Bicycles"
  ];
  let endNum = getRandomNum(0, endWords.length);
  return endWords[endNum];
}

const beers = [];

for (let i = 0; i <= 100; i++) {
  let newBeer = {
    name: `${randomFrontWords()} ${randomEndNames()}`,
    description: `${randomDescriptions()}`,
    abv: faker.finance.amount(2.9, 9.9, 1),
    ibu: faker.finance.amount(10, 100, 0),
    beerImg: null,
    breweryId: faker.finance.amount(1, 30, 0),
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  };
  beers.push(newBeer);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Beers', beers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Beers', null, {});
  }
};

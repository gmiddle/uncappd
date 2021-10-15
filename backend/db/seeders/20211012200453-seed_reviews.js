'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomReviews() {
  const reviewPlaceholders = [
    "This is so good right now.",
    "So good even though I just had months back. Great to be back here drinking in the sun",
    "Delicate & spring-like",
    "My personal favorite from the day",
    "The dessert pairing is a bit over tuning the beer. Nevertheless the beer is so delicate and awesome",
    "Celebrating selling the townhouse, even though we rent back for a month and can’t move for 3 weeks. It’s in the books though :). My dandelion picking vintage",
    "First Father’s Day! Finally got off work. Time for the good stuff!",
    "Lovely. More honey than Anna.",
    "Very Crushable.  Will drink again.",
    "Incredibly smooth. Great mouthfeel. Mild tartness. Outstanding.",
    "I thought this particular batch was lemon forward with stronger floral notes than 2018 but a little less balanced overall.",
    "Perfect warm weather beer.",
    "It was a banger such a mellow funk that had you wanting more",
    "Floral honey, sparkling white wine, chamomile, jasmine, prickly lemongrass brett, subtle oak, delicate semi-dry finish",
    "Good balance of tart, funky, touch of honey on the finish. Delicious",
    "Spring field, very floral, textural, soft honey, sweet lemon.",
    "Lots of tart and beautiful flavors - if you have had beers from here and can ever get it, do it!",
    "Super lively carbonation, minerality, oaky with a great floral honey combo. Awesome drinker.",
    "Light, crisp, tart & refreshing. Great.",
    "Always a terrific sipper, this is drinking wonderfully right meow.",
    "Tons of wine barrel and lemon. Fantastic stuff.  Really cool artwork on can.",
    "Great wine barrel and fantastic water quality. I wish I lived in the place that makes this!",
    "Sooo smooth and not bitter.  Delicious!",
    "Nice and light! Wishing for a little more fruit to come through, but otherwise phenomenal",
    "Gorgeous color, fantastic offering. Two years in wine barrels and 2 more bottle conditioning",
    "Amazing. Dry, crisp & sweet. If a Sauvignon blanc was a beer. That was perfectly executed of course.",
    "Damn this is nice. Super drinkable and perfect tartness.",
    "Deep flavors. Pungent coffee and chocolate flavors, with a rich maple background and the ever present bourbon that hits at the end.",
    "Delish as always. Still can't believe they stopped production on this.",
    "Kick off the cooler seasons properly. It’s porter and stout season. Here’s a legend"
  ];
  let reviewNum = getRandomNum(0, reviewPlaceholders.length);
  return reviewPlaceholders[reviewNum];
}



const reviews = [];

for (let i = 0; i <= 400; i++) {
  let newReview = {
    rating: faker.finance.amount(3.5, 5.0, 1),
    review: `${randomReviews()}`,
    userId: faker.finance.amount(1, 20, 0),
    beerId: faker.finance.amount(1, 100, 0),
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  }
  reviews.push(newReview);
};


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};

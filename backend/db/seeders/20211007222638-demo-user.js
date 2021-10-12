'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const fakeUsers = [
  {
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
  },

]

for (let i = 0; i <= 80; i++) {
  let newUser = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
  }
  fakeUsers.push(newUser)
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition'] }
    }, {});
  }
};
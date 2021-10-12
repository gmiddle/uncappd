'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    breweryPic: DataTypes.TEXT
  }, {});
  Brewery.associate = function(models) {
    // associations can be defined here
    Brewery.hasMany(models.Beer, { foreignKey: 'breweryId' })
  };
  return Brewery;
};
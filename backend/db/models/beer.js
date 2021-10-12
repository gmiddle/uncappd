'use strict';
module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define('Beer', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    abv: DataTypes.INTEGER,
    ibu: DataTypes.INTEGER,
    beerImg: DataTypes.TEXT,
    breweryId: DataTypes.INTEGER
  }, {});
  Beer.associate = function(models) {
    // associations can be defined here
    Beer.hasMany(models.Review, { foreignKey: 'beerId' })
    Beer.belongsTo(models.Brewery, { foreignKey: 'breweryId' })
  };
  return Beer;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: DataTypes.NUMERIC,
    review: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    beerId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Beer, { foreignKey: 'beerId' })
    Review.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Review;
};
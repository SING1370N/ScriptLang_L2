'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [
      {
        "name": "Model 1",
        "brand_id": 2,
        "price": 18000,
        "stock": 100,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Model 2",
        "brand_id": 2,
        "price": 14000,
        "stock": 50,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Model 3",
        "brand_id": 2,
        "price": 10000,
        "stock": 50,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items');
  }
};

'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', [
        {
          "name": "Asus",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name": "MSI",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name": "Lenovo",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
    ], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands');
  }
};

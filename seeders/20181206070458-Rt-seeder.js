'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rts', [{
      nama: 'Rt001',
      umur:'30',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rts', null, {});
  }
};

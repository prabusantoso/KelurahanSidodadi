'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rts', [{
      nama: 'STAF001',
      umur:'35',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama: 'RT001',
      umur:'30',
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rts', null, {});
  }
};

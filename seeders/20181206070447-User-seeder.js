'use strict';
const bcrypt = require('bcrypt');


module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('ADMIN', 10); 
    const password1 = bcrypt.hashSync('STAF001', 10);
    const password2 = bcrypt.hashSync('RT001', 10);
   return queryInterface.bulkInsert('Users', [{
    username: 'ADMIN',
    password : password,
    level: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    username: 'STAF001',
    password : password1,
    level: 'Staf',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    username: 'RT001',
    password : password2,
    level: 'Rt',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

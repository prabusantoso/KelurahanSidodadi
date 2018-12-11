'use strict';
const bcrypt = require('bcrypt');


module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('admin', 10); 
    const password1 = bcrypt.hashSync('rt001', 10);
   return queryInterface.bulkInsert('Users', [{
    username: 'admin',
    password : password,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    username: 'rt001',
    password : password1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

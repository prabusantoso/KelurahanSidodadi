'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    tanggal: DataTypes.DATE,
    waktuacara: DataTypes.TIME,
    keterangan: DataTypes.TEXT
  }, {});
  Agenda.associate = function(models) {
    // associations can be defined here
  };
  return Agenda;
};
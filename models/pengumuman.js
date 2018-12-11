'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pengumuman = sequelize.define('Pengumuman', {
    namapengumuman: DataTypes.STRING,
    tgldibuat: DataTypes.DATE,
    keterangan: DataTypes.TEXT
  }, {});
  Pengumuman.associate = function(models) {
    // associations can be defined here
  };
  return Pengumuman;
};
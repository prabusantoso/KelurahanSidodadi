'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rt = sequelize.define('Rt', {
    nama: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  Rt.associate = function(models) {
    // associations can be defined here
  };
  return Rt;
};
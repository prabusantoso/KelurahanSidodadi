'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kegiatan = sequelize.define('Kegiatan', {
    namakegiatan: DataTypes.STRING,
    foto: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    createdby: DataTypes.STRING,
    rtId: DataTypes.INTEGER
  }, {});
  Kegiatan.associate = function(models) {
    // associations can be defined here
    Kegiatan.belongsTo(sequelize.models.Rt, {foreignKey: 'rtId'})
  };
  return Kegiatan;
};
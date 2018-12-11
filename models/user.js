'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    foto: DataTypes.STRING,
    level: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate(user => {
    user.username = user.username.toUpperCase()
    return user
  })

  User.afterDestroy(user =>{
    return sequelize.models.Kegiatan.destroy({
	    where:{
	      userId:UserId
	    }
    })
  })
return User;
};
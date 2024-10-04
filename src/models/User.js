const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const User = sequelize.define('User', {
	   id:{
		  type:DataTypes.INTEGER,
          unique:true,
		  primaryKey:true,
		  allowNull:false,
		  autoIncrement:true

	   },
	    username: {
		            type: DataTypes.STRING,
		            //unique: true,
		            allowNull: false,
		        },
	    password: {
		            type: DataTypes.STRING,
		            allowNull: false,
		        },
});

module.exports = User;


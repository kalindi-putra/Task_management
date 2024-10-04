const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../services/db');
const User = require('./User');

const Task = sequelize.define('Task', {
	  task_id:{
		type:DataTypes.INTEGER,
		primaryKey: true, 
		unique:true,
		allowNull:false,
		autoIncrement:true
	  },
	    title: {
		            type: DataTypes.STRING,
		            allowNull: false,
		        },
	    description: {
		            type: DataTypes.STRING,
		        },
	    status: {
		            type: DataTypes.STRING,
		            allowNull: false,
		        },
	    priority: {
		            type: DataTypes.STRING,
		            allowNull: false,
		        },
	    due_date: {
		            type: DataTypes.DATE,
		        },
			
		userId:{
			type:DataTypes.INTEGER,
			references: { model: 'Users', key: 'id' }

		}
	});


Task.belongsTo(User, { foreignKey: 'userId' });
	
module.exports = Task;


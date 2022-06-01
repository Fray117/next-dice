'use strict'
const {
	Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.room_master, { as: 'rooms' })
		}
	}
	users.init({
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'users',
	})
	return users
}
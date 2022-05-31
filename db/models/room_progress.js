'use strict'
const {
	Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class room_progress extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	room_progress.init({
		owner: DataTypes.INTEGER,
		holder: DataTypes.INTEGER,
		value: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'room_progress',
	})
	return room_progress
}
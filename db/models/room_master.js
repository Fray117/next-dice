'use strict'
const {
	Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class room_master extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.room_players, { foreignKey: 'room_id', as: 'players' })
		}
	}
	room_master.init({
		name: DataTypes.STRING,
		owner: DataTypes.INTEGER,
		dice: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 4
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}, // 0: waiting player, 1: ready, 2: playing, 3: finished
	}, {
		sequelize,
		modelName: 'room_master',
	})
	return room_master
}
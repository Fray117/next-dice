'use strict'
const {
	Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class room_players extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.room_progress, { foreignKey: 'holder', as: 'dices' })
			this.belongsTo(models.room_master, { foreignKey: 'room_id', as: 'master' })
		}
	}
	room_players.init({
		users_id: DataTypes.INTEGER,
		room_id: DataTypes.INTEGER,
		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}, // 0: not ready, 1: ready, 2: playing, 3: finished
	}, {
		sequelize,
		modelName: 'room_players',
	})
	return room_players
}
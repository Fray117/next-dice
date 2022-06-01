'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('room_players', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			users_id: {
				type: Sequelize.INTEGER
			},
			room_id: {
				type: Sequelize.INTEGER
			},
			score: {
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('room_players')
	}
}
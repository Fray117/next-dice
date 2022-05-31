'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('room_masters', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			owner: {
				type: Sequelize.INTEGER
			},
			dice: {
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
		await queryInterface.dropTable('room_masters')
	}
}
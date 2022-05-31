'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('room_progresses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			owner: {
				type: Sequelize.INTEGER
			},
			holder: {
				type: Sequelize.INTEGER
			},
			value: {
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
		await queryInterface.dropTable('room_progresses')
	}
}
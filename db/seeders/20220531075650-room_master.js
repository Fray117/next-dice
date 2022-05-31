'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('room_masters', [
			{
				name: 'Quick Game',
				owner: 1,
				dice: 4,
				status: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('room_masters', null, {})
	}
}

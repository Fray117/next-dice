'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('room_progresses', [
			{
				owner: 1,
				holder: 1,
				value: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				owner: 1,
				holder: 1,
				value: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				owner: 1,
				holder: 1,
				value: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				owner: 1,
				holder: 1,
				value: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('room_progresses', null, {})
	}
}

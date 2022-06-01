'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('room_players', [
			{
				users_id: 1,
				room_id: 1,
				score: 0,
				status: 1, // 0: not ready, 1: ready, 2: playing, 3: finished
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('room_players', null, {})
	}
}

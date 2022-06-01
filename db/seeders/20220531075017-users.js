'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [
			{
				username: 'johndoe1',
				email: 'example1@example.com',
				password:
					'$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq', // password
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'johndoe2',
				email: 'example2@example.com',
				password:
					'$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq', // password
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {})
	}
}

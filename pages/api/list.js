// import nextConnect from 'next-connect'
// import middleware from '../../../middleware/auth'
const models = require('../../db/models/index')

export default async function handler(req, res) {
	const {
		query: { nextPage },
		method,
		body,
		user,
	} = req

	// const users = await models.users.findAll({
	// 	// include: [
	// 	// 	{
	// 	// 		model: models.users,
	// 	// 		as: 'user',
	// 	// 	},
	// 	// ],
	// 	// attributes: {
	// 	// 	exclude: ['userId'],
	// 	// },
	// 	order: [
	// 		// Will escape title and validate DESC against a list of valid direction parameters
	// 		['id', 'DESC'],
	// 	],
	// 	offset: nextPage ? +nextPage : 0,
	// 	limit: 5,
	// })

	const test = await models.users

	res.statusCode = 200
	// res.send(test)
	res.json({
		status: 'success',
		models: test
		// data: users.rows,
		// total: users.count,
		// nextPage: +nextPage + 5,
	})
}
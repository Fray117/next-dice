// import nextConnect from 'next-connect'
// import middleware from '../../../middleware/auth'
import db from '../../db/models/index'

export default async function handler(req, res) {
	const {
		query: { nextPage },
		method,
		body,
		user,
	} = req

	const users = await db.users.findAll({
		order: [
			// Will escape title and validate DESC against a list of valid direction parameters
			['id', 'DESC'],
		],
		limit: 5,
	})

	res.statusCode = 200
	res.json({
		status: 'success',
		db: users,
		// total: users.count,
		// nextPage: +nextPage + 5,
	})
}
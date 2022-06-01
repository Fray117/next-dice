// import nextConnect from 'next-connect'
// import middleware from '../../../middleware/auth'
import db from '../../../db/models/index'

export default async function handler(req, res) {
	const {
		query: { nextPage },
		method,
		body,
		user,
	} = req

	const { view } = req.query

	const room_masters = await db.room_master.findOne({
		where: {
			id: view,
		},
		include: [
			'players'
		],
		order: [
			['id', 'DESC'],
		],
	})

	res.statusCode = 200
	res.json({
		status: 'success',
		data: room_masters,
	})
}
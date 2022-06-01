// import nextConnect from 'next-connect'
// import middleware from '../../../middleware/auth'
import db from '../../../../db/models/index'

export default async function handler(req, res) {
	const {
		query: { nextPage },
		method,
		body,
		user,
	} = req

	const { view } = req.query

	const room_players = await db.room_players.findOne({
		where: {
			id: view,
		},
		include: [
			'dices'
		],
		order: [
			['id', 'DESC'],
		],
	})

	res.statusCode = 200
	res.json({
		status: 'success',
		data: room_players,
	})
}
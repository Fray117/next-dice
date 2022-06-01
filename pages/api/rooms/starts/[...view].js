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

	const room_master = await db.room_master.findOne({
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

	let players = []

	await room_master.players.forEach(async (player) => {
		players.push(await db.room_players.findOne({
			where: {
				id: player.id,
			},
			include: [
				'dices'
			],
		}))

	})

	res.statusCode = 200
	res.json({
		status: 'success',
		players: players,
		data: room_master,
	})
}
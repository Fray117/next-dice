// import nextConnect from 'next-connect'
// import middleware from '../../../middleware/auth'
import db from '../../../../../db/models/index'

export default async function handler(req, res) {
	const {
		query: { nextPage },
		method,
		body,
		user,
	} = req

	const { dice } = req.query

	const room_progress = await db.room_progress.update({
		holder: body.holder,
		value: body.value,
	}, {
		where: {
			id: dice,
		},
	})

	const room_players = await db.room_players.findOne({
		where: {
			id: room_progress.holder,
		},
		include: [
			'dices', 'master'
		],
		order: [
			['id', 'DESC'],
		],
	})

	if (room_players) {
		res.status(200).json({
			status: 'success',
			room: room_players,
			progress: room_progress,
		})
	} else {
		res.status(400)
	}

	res.end()
}
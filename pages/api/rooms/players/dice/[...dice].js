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

	const room_players = await db.room_players.findOne({
		where: {
			id: body.holder,
		},
		include: [
			'master'
		],
		order: [
			['id', 'DESC'],
		],
	})

	const room_master = await db.room_master.findOne({
		where: {
			id: room_players.master.id,
		},
		include: [
			'players'
		],
		order: [
			['id', 'DESC'],
		],
	})

	let nextPlayer = 0

	for (let index = 0; index < room_master.players.length; index++) {
		if (room_master.players[index].id === body.holder) {
			if (index === room_master.players.length - 1) {
				nextPlayer = room_master.players[0].id
			} else {
				nextPlayer = room_master.players[index++].id
			}
		}
	}

	let holder = body.holder

	if (body.value === 6) {
		holder = 0

		await db.room_players.update({
			score: room_players.score + 1,
		}, {
			where: {
				id: room_players.id,
			}
		})
	} else if (body.value === 1) {
		holder = nextPlayer
	}

	const room_progress = await db.room_progress.update({
		holder: holder,
		value: body.value,
	}, {
		where: {
			id: dice,
		},
	})

	if (room_players) {
		res.status(200).json({
			status: 'success',
			id: dice,
			body: body,
			next: nextPlayer,
			master: room_master,
			room: room_players,
			progress: room_progress,
		})
	} else {
		res.status(400)
	}

	res.end()
}
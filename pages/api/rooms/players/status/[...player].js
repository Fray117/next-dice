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

	const { player } = req.query

	const room_players = await db.room_players.findOne({
		where: {
			id: player,
		},
		include: [
			'master'
		]
	})


	if (room_players.master.status === 0) {
		const statuses = await db.room_players.update({ status: 1 }, {
			where: {
				id: player,
			},
		})

		if (room_players) res.redirect("/room/" + room_players.room_id)
	}

	res.status(400)
}
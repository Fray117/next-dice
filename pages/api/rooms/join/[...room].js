import db from '../../../../db/models/index'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
	const session = await getSession({ req })
	const { room } = req.query

	if (session) {
		if (!room) {
			return res.status(400)
		}

		db.room_master.findOne({
			where: {
				id: room
			},
			include: [
				'players'
			]
		}).then(async joined => {
			let safe = true
			joined.players.map(player => {
				if (player.users_id === session.user.id) {
					safe = false
				}
			})

			if (safe) {
				await db.room_players.create({
					users_id: session.user.id,
					room_id: room,
					score: 0,
					status: 0
				}).then(async (player) => {
					for (let index = 0; index < joined.dice; index++) {
						const dice = await db.room_progress.create({
							owner: player.id,
							holder: player.id,
							value: 0,
						})
					}
				})
			}
		})

		res.redirect("/")
	} else {
		res.status(401)
	}
}
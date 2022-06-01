import db from '../../../db/models/index'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
	const body = req.body

	const session = await getSession({ req })

	if (session) {
		if (!body.title || !body.dice) {
			return res.status(400).json({
				message: 'Please fill out all fields'
			})
		}

		const user = await db.room_master.create({
			owner: session.user.id,
			name: body.title,
			dice: body.dice,
			status: 0
		})

		res.redirect("/")
	} else {
		res.status(401)
	}
}
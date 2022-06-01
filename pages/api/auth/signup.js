import db from '../../../db/models/index'
import bcrypt from 'bcrypt'

export default function handler(req, res) {
	const body = req.body

	const route = useRouter()

	if (!body.username || !body.email || !body.password) {
		return res.status(400).json({
			message: 'Please fill out all fields'
		})
	}

	// const user = await db.users.findByPk(1)//findOne({ where: { username: credentials.username } })

	bcrypt.hash(body.password, 10, async (err, hash) => {
		const user = await db.users.create({
			username: body.username,
			email: body.email,
			password: hash
		})

		// res.status(200).json({ data: user })
		res.redirect("/auth/login")
	})
}
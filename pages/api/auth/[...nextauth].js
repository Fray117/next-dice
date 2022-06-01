import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from '../../../db/models/index'
import bcrypt from 'bcrypt'

export default NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				const user = await db.users.findByPk(1)//findOne({ where: { username: credentials.username } })

				// bcrypt.hash(credentials.password, 10, (err, hash) => {
				// 	// Store hash in your password DB.
				// })

				if (user) {
					await bcrypt.compare(credentials.password, user.password, (err, result) => {
						if (result) {
							return user
						}
					})

					return user
				}

				// Return null if user data could not be retrieved
				return null
			}
		})
	],

	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},

	pages: {
		signIn: '/auth/login',
	}

})
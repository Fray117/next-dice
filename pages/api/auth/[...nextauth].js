import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from '../../../db/models/index'
import bcrypt from 'bcrypt'

export default NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				const user = await db.users.findOne({ where: { username: credentials.username } })

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

	callbacks: {
		async session({ session, user, token }) {
			const users = await db.users.findOne({ where: { email: session.user.email } })

			session.user.id = users.id

			return session
		},
	},

	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},

	pages: {
		signIn: '/auth/login',
	}

})
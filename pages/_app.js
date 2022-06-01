import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Dice</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	)
}
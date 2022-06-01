import { getSession, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect } from "react"

import Container from './container'

export default function Secured(props) {
	const { data: session, status } = useSession()
	const router = useRouter()

	if ((typeof window === "undefined") || (status === "loading")) return (
		<div className="flex w-screen h-screen justify-center items-center">Loading</div>
	)

	if (status === "unauthenticated") {
		router.push('/auth/login')
	}

	return (
		<Container>
			{props.children}
		</Container>
	)
}

export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	}
}
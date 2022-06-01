import { getSession, useSession } from "next-auth/react"

import useSwr from 'swr'
import Secured from '../components/Secured'

import { useRouter } from 'next/router'
import Link from "next/link"

const fetcher = (url) => fetch(url).then((res) => res.json())

function amIAlreadyJoined(players, mySession) {
	let alreadyJoined = false
	players.map(player => {
		if (player.users_id === mySession.user.id) {
			alreadyJoined = true
		}
	})

	return alreadyJoined
}

function getStatus(code) {
	const status = ['Waiting Player', 'Ready', 'Playing', 'Finished']
	return status[code]
}


export default function RoomView() {
	const { data: session, status } = useSession()

	const router = useRouter()
	const { view } = router.query

	const { data, error } = useSwr(`/api/rooms/${view}`, fetcher)
	const { data: userData, error: userError } = useSwr("/api/list", fetcher)

	if (error || userError) return <div className="flex w-screen h-screen justify-center items-center">Failed to load room</div>
	if (!data || !userData) return <div className="flex w-screen h-screen justify-center items-center">Loading App</div>

	let my, waiting

	if (amIAlreadyJoined(data.data.players, session)) {
		my = data.data.players.find(player => player.users_id === session.user.id)

		waiting = (my.status === 0)
	}

	return (
		<Secured>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">Game Information</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">Quick summary about current game.</p>
				</div>
				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Title</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.data.name}</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Host Player</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{/* find userdata by its id */}
								{userData.db.find(user => user.id === data.data.owner).username}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Playable Dice</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.data.dice}</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Players Joined</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{data.data.players.filter(player => player.status > 0).length} of {data.data.players.length} ready
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Game Status</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{getStatus(data.data.status)}</dd>
						</div>
					</dl>
				</div>
			</div>

			{amIAlreadyJoined(data.data.players, session) ? (
				<div className="w-full mx-auto py-3 flex gap-x-8">
					{
						waiting ?
							(
								<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-48">
									<Link href={`/api/rooms/players/status/${my.id}`}>
										<a
											className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-600 text-white hover:text-red-50"
										>
											Ready
										</a>
									</Link>
								</div>
							) : (
								<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-48">
									<Link href="#">
										<a
											className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-300 cursor-wait text-white hover:text-red-50"
										>
											Waiting for others
										</a>
									</Link>
								</div>
							)
					}
					{
						(my.users_id === data.data.owner) ?
							(
								<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-48">
									<Link href={`/room/game/${view}`}>
										<a
											className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:text-blue-50"
										>
											Start Game
										</a>
									</Link>
								</div>
							) : (
								''
								// <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-48">
								// 	<Link href={`/room/game/${view}`}>
								// 		<a
								// 			className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:text-blue-50"
								// 		>
								// 			Enter Game
								// 		</a>
								// 	</Link>
								// </div>
							)
					}
				</div>
			) : ''}
		</Secured>
	)
}

export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	}
}
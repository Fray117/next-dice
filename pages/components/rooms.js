import { getSession, useSession } from "next-auth/react"
import {
	HeartIcon,
	CheckIcon,
	XIcon,
	StatusOnlineIcon,
	UserIcon,
} from '@heroicons/react/solid'
import { useRouter } from "next/router"

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function getStatus(code) {
	const status = ['Waiting Player', 'Ready', 'Playing', 'Finished']
	return status[code]
}

function amIAlreadyJoined(players, mySession) {
	let alreadyJoined = false
	players.map(player => {
		if (player.users_id === mySession.user.id) {
			alreadyJoined = true
		}
	})

	return alreadyJoined
}

export default function Rooms(props) {
	const { data: session, status } = useSession()
	const router = useRouter()

	return (
		<div className="lg:flex lg:items-center lg:justify-between">
			<div className="flex-1 min-w-0">
				<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{props.title}</h2>
				<div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<HeartIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{props.dice}
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{props.players.length}
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<StatusOnlineIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						{getStatus(props.status)}
					</div>
				</div>
			</div>
			<div className="mt-5 flex lg:mt-0 lg:ml-4">
				<span className="hidden sm:block ml-3">
					<button
						type="button"
						onClick={() => {
							router.push('/room/[room]', `/room/${props.room}`)
						}}
						className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						View
					</button>
				</span>

				<span className="sm:ml-3">
					{amIAlreadyJoined(props.players, session)}
					<button
						type="button"
						onClick={() => {
							router.push('/api/rooms/join/[room]', `/api/rooms/join/${props.room}`)
						}}
						disabled={amIAlreadyJoined(props.players, session)}
						className={classNames(
							amIAlreadyJoined(props.players, session) ? 'bg-red-700 cursor-not-allowed' : 'hover:bg-red-700 bg-red-600',
							"inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						)}>
						{amIAlreadyJoined(props.players, session) ? (<XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />) : (<CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />)}
						{amIAlreadyJoined(props.players, session) ? 'Already Joined' : 'Join Room'}
					</button>
				</span>

				<div as="div" className="ml-3 relative sm:hidden w-96">
					<span onClick={() => {
						router.push('/room/[room]', `/room/${props.room}`)
					}} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
						View Game
					</span>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	}
}
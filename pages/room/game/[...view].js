import { getSession, useSession } from "next-auth/react"

import useSwr from 'swr'
import Secured from '../../components/Secured'
import GameComponent from './component'

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

function generatePlayers(player, dice) {
	let players = []

	for (let id = 0; id < player; id++) {
		let dices = []

		for (let die = 0; die < dice; die++) {
			dices.push(0)
		}

		players.push({
			'name': 'Player ' + id,
			'dice': dices,
			'score': 0
		})
	}

	return players
}

function diceRoll(players) {
	let output = []

	for (let player = 0; player < players.length; player++) {
		const element = players[player]

		const nextPlayer = players[
			(player + 1) >= players.length ? 0 : (player + 1)
		]

		for (let i = 0; i < element.dice.length; i++) {
			element.dice[i] = Math.floor(Math.random() * 6) + 1

			if (element.dice[i] == 1) {
				nextPlayer.dice.push(element.dice[i])

				element.dice.splice(i, 1)
			} else if (element.dice[i] == 6) {
				element.score += 1

				element.dice.splice(i, 1)
			}
		}

		output.push(element)
	}

	return output
}

export default function GameStart() {
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
			{/* loop list from data */}
			<div className="flex gap-8">
				{data.data.players.map((player, index) => (
					<div key="player">
						<div className="flex flex-col w-full">
							<GameComponent game={data} player={player}></GameComponent>
						</div>
					</div>
				))}
			</div>

			{
				amIAlreadyJoined(data.data.players, session) ? (
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
									<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-48">
										<Link href={`/room/game/${view}`}>
											<a
												className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:text-blue-50"
											>
												Enter Game
											</a>
										</Link>
									</div>
								)
						}
					</div>
				) : ''
			}
		</Secured >
	)
}

export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	}
}
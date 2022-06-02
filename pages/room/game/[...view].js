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

export default function GameStart() {
	const { data: session, status } = useSession()

	const router = useRouter()
	const { view } = router.query

	const { data, error } = useSwr(`/api/rooms/${view}`, fetcher)
	const { data: userData, error: userError } = useSwr("/api/list", fetcher)

	if (error || userError) return <div className="flex w-screen h-screen justify-center items-center">Failed to load room</div>
	if (!data || !userData) return <div className="flex w-screen h-screen justify-center items-center">Loading App</div>

	let my, waiting

	if (status !== 'authenticated') return false

	if (amIAlreadyJoined(data.data.players, session)) {
		my = data.data.players.find(player => player.users_id === session.user.id)

		waiting = (my.status === 0)
	}

	function diceRoll(players) {
		let output = []

		for (let player = 0; player < players.length; player++) {
			const element = players[player]

			const nextPlayer = players[
				(player + 1) >= players.length ? 0 : (player + 1)
			]

			for (let i = 0; i < element.dices.length; i++) {
				element.dices[i] = Math.floor(Math.random() * 6) + 1

				if (element.dices[i] == 1) {
					nextPlayer.dices.push(element.dices[i])

					element.dices.splice(i, 1)
				} else if (element.dices[i] == 6) {
					element.score += 1

					element.dices.splice(i, 1)
				}
			}

			output.push(element)
		}

		return output
	}

	// TODO: migrate diceRoll function to this 
	async function roll(player) {
		console.log(player)

		let out = []

		for (let p = 0; p < player.length; p++) {
			const element = player[p]

			let output = []

			for (let i = 0; i < element.dices.length; i++) {
				const dice = element.dices[i]

				const score = Math.floor(Math.random() * 6) + 1

				dice.value = score

				if (score === 6) {
					element.score += 1

					player.score = player.score + 1

					element.dices.splice(i, 1)

					// 	const res = await fetch('/api/rooms/players/dice/' + dice.id, {
					// 		method: 'POST',
					// 		headers: {
					// 			'Content-Type': 'application/json',
					// 		},

					// 		body: JSON.stringify(dice),
					// 	})
				}

				output.push(dice)
			}

			out.push(output)
		}

		console.log(out)

		return out
	}

	return (
		<Secured>
			{/* loop list from data */}
			<div className="flex justify-center gap-8">
				{data.data.players.map((player, index) => {
					const { data: playerData, error: playerError } = useSwr(`/api/rooms/players/${player.id}`, fetcher)

					if (playerError) return <div className="flex w-full h-full justify-center items-center">Failed to load player</div>
					if (!playerData) return <div className="flex w-full h-full justify-center items-center">Loading Data</div>

					player.dices = playerData.data.dices

					return (
						<div key={index}>
							<div className="flex flex-col w-full">
								<GameComponent game={data} dice={player.dices} player={player}></GameComponent>
							</div>
						</div>
					)
				})}
			</div>

			{
				amIAlreadyJoined(data.data.players, session) ? (
					<div className="w-full mx-auto py-3 flex gap-x-8">
						{
							(my.users_id === data.data.owner) ?
								(
									<div onClick={() => roll(data.data.players)} className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-48">
										<a
											className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:text-blue-50"
										>
											Roll Dice
										</a>
									</div>
								) : ''
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
import useSwr from 'swr'

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
function roll(dice) {
	let output = []

	for (let i = 0; i < dice; i++) {
		const score = Math.floor(Math.random() * 6) + 1
		output.push(score)

		if (score === 6) {
			output.score += 1
		}
	}

	return output
}

export default function GameComponent(props) {
	const { data, error } = useSwr(`/api/rooms/players/${props.player.id}`, fetcher)

	if (error) return <div className="flex w-screen h-screen justify-center items-center">Failed to load room</div>
	if (!data) return <div className="flex w-screen h-screen justify-center items-center">Loading App</div>


	return (
		<>
			<div className='flex flex-col items-center'>
				<div>
					<div className='w-10 h-10 rounded-full bg-sky-100 flex justify-center items-center text-sky-700 font-extrabold'>{props.player.id}</div>
					<span>{props.player.score}</span>
				</div>

				<div className="flex -space-x-1 overflow-hidden">
					{data.data.dices.map((dice, index) => (
						<div key="dice.id" className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-red-200 text-red-700 flex justify-center items-center">
							{dice.value}
						</div>
					))}
				</div>
			</div>
			{JSON.stringify(roll(data.data.dices))}
		</>
	)
}
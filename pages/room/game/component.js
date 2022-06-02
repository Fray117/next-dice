// import { useState } from 'React'

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

export default function GameComponent(props) {
	const { data, error } = useSwr(`/api/rooms/players/${props.player.id}`, fetcher)

	if (error) return <div className="flex w-screen h-screen justify-center items-center">Failed to load room</div>
	if (!data) return <div className="flex w-screen h-screen justify-center items-center">Loading App</div>

	// const [player, setPlayer] = useState(props.player)
	// const [dice, setDice] = useState(data.data.dices)
	const player = props.player
	const dice = data.data.dices

	// TODO: migrate diceRoll function to this 
	async function roll(dice, player) {
		let output = []

		for (let i = 0; i < dice.length; i++) {
			const score = Math.floor(Math.random() * 6) + 1

			dice[i].value = score

			if (score === 6) {
				player.score = player.score + 1

				const res = await fetch('/api/rooms/players/dice/' + dice[i].id, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},

					body: JSON.stringify(dice[i]),
				})
			}

			output.push(dice[i])
		}

		return output
	}

	return (
		<>
			<div className='flex flex-col items-center'>
				<div>
					<div className='w-10 h-10 rounded-full bg-sky-100 flex justify-center items-center text-sky-700 font-extrabold'>{props.player.id}</div>
					<span className='w-full flex justify-center items-center font-extrabold'>{player.score}</span>
				</div>

				<div className="flex -space-x-1 overflow-hidden">
					{dice.map((dice, id) => (
						<div key={id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-red-200 text-red-700 flex justify-center items-center">
							{dice.value}
						</div>
					))}
				</div>
			</div>
			<div className='flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:text-blue-50' onClick={() => roll(dice, player)}>Roll the Dice</div>
		</>
	)
}
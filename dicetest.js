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
		const element = players[player];

		const nextPlayer = players[
			(player + 1) >= players.length ? 0 : (player + 1)
		]

		for (let i = 0; i < element.dice.length; i++) {
			element.dice[i] = Math.floor(Math.random() * 6) + 1;

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

const sampling = {
	iteration: 100000,
	player: 4,
	dice: 6
}

let dataset = {
	sample: [],
	scores: [],
	median: 0
}

for (let index = 0; index < sampling.iteration; index++) {
	let roll = true

	let player = generatePlayers(sampling.player, sampling.dice)

	while (roll) {
		let stopLimit = player.length
		let stopSign = 0

		let totalScore = 0

		for (let index = 0; index < player.length; index++) {
			totalScore = totalScore + player[index].score

			if (player[index].dice.length < 1) {
				stopSign = stopSign + 1
			}

			if (stopSign == (stopLimit - 1)) {
				roll = false

				dataset.sample.push({
					match: player,
					totalScore: totalScore
				})

				dataset.scores.push(totalScore)

				dataset.median = dataset.median + totalScore
			} else {
				diceRoll(player)
			}
		}
	}
}

console.log({
	'Max': Math.max.apply(Math, dataset.scores),
	'Min': Math.min.apply(Math, dataset.scores),
	'Median': dataset.median / sampling.iteration,
	'Mean': dataset.scores.reduce((a, b) => a + b, 0) / dataset.scores.length,
	'Standard Deviation': Math.sqrt(
		dataset.scores.reduce((a, b) => a + b, 0) / dataset.scores.length
	)
});

// console.log(JSON.stringify(dataset));
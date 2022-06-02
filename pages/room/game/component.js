export default function GameComponent(props) {
	return (
		<>
			<div className='flex flex-col items-center'>
				<div>
					<div className='w-10 h-10 rounded-full bg-sky-100 flex justify-center items-center text-sky-700 font-extrabold'>{props.player.id}</div>
					<span className='w-full flex justify-center items-center font-extrabold'>{props.player.score}</span>
				</div>

				<div className="flex -space-x-1 overflow-hidden">
					{props.dice.map((dice, id) => (
						<div key={id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-red-200 text-red-700 flex justify-center items-center">
							{dice.value}
						</div>
					))}
				</div>
			</div>
		</>
	)
}
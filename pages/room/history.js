import useSwr from 'swr'
import Secured from '../components/Secured'
import Rooms from '../components/rooms'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function History() {
	const { data, error } = useSwr('/api/rooms', fetcher)

	if (error) return <div className="flex w-screen h-screen justify-center items-center">Failed to load users</div>
	if (!data) return <div className="flex w-screen h-screen justify-center items-center">Loading...</div>

	return (
		<Secured>
			<div className="w-full mx-auto py-3">
				<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-36">
					<a
						href="#"
						className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-red-600 text-white hover:text-red-50"
					>
						Create Room
					</a>
				</div>
			</div>

			{data.data.map((room) => {
				if (room.status > 1)
					(
						<Rooms key={room.id} dice={room.dice} players={room.players} status={room.status} title={room.name} />
					)
			})}
		</Secured>
	)
}
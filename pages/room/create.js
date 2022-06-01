import useSwr from 'swr'
import Secured from '../components/Secured'
import Rooms from '../components/rooms'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Create() {
	const { data, error } = useSwr('/api/rooms', fetcher)

	if (error) return <div className="flex w-screen h-screen justify-center items-center">Failed to load users</div>
	if (!data) return <div className="flex w-screen h-screen justify-center items-center">Loading...</div>

	return (
		<Secured>
			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Game Information</h3>
							<p className="mt-1 text-sm text-gray-600">Quick info to distinguish with other game.</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="/api/rooms/create" method="POST">
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6">
											<label htmlFor="title" className="block text-sm font-medium text-gray-700">
												Game Title
											</label>
											<input
												type="text"
												name="title"
												id="title"
												autoComplete="title"
												className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label htmlFor="dice" className="block text-sm font-medium text-gray-700">
												Dice Amount
											</label>
											<input
												type="number"
												name="dice"
												id="dice"
												autoComplete="address-level2"
												className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Secured>
	)
}
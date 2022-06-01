import Secured from './components/Secured'
import Rooms from './components/rooms'

import db from '../db/models/index'

const room_masters = db.room_masters.findAll()

export default function Home() {
	return (
		<Secured>
			{JSON.stringify(room_masters)}
			<Rooms dice={4} player={3} status={0} title="Quick Game" />
		</Secured>
	)
}
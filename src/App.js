import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import './App.css'
import UserFields from './components/UserFields'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { useState } from 'react'
import DriverZones from './components/DriverZones'

function App() {
	const zones = {
		Beirut: [
			{
				id: 734892759837598,
				name: 'Hamra',
			},
			{
				id: 734892759835346498,
				name: 'Verdun',
			},
			{
				id: 73489275983123598,
				name: 'Ras El Nabe3',
			},
		],
		Jounieh: [
			{
				id: 7348234759837598,
				name: 'Zouk Mosbeh',
			},
			{
				id: 73412332759835346498,
				name: 'Kaslik',
			},
		],
	}
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div className='App'>
				<header className='App-header'>
					{/* <UserFields /> */}
					<DriverZones zones={zones} />
				</header>
			</div>
		</MuiPickersUtilsProvider>
	)
}

export default App

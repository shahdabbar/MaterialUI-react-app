import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	formControl: {
		margin: theme.spacing(3),
	},
	zonesWrapper: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'center',
	},
	zonesContainer: {
		marginLeft: 20,
		border: '1px solid white',
		padding: 10,
	},
}))

function DriverZones({ zones }) {
	const classes = useStyles()
	const [selectedZones, setSelectedZones] = useState([])

	const handleChange = (id) => {
		selectedZones.includes(id)
			? setSelectedZones((prev) => prev.filter((zone) => zone !== id))
			: setSelectedZones([...selectedZones, id])
	}

	console.log('selectedZones', selectedZones)

	return (
		<div>
			<FormControl component='fieldset' className={classes.formControl}>
				<FormLabel component='legend'>Zones</FormLabel>
				<FormGroup>
					{Object.entries(zones).map(([key, values]) => (
						<div key={key} className={classes.zonesWrapper}>
							<h4>{key}</h4>
							<div className={classes.zonesContainer}>
								{values.map((value) => (
									<FormControlLabel
										key={value.id}
										control={
											<Checkbox
												checked={selectedZones.includes(value.id)}
												onChange={() => handleChange(value.id)}
												name={value.name}
											/>
										}
										label={value.name}
									/>
								))}
							</div>
						</div>
					))}
				</FormGroup>
			</FormControl>
		</div>
	)
}

export default DriverZones
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
		padding: '10px',
	},
	zonesContainer: {
		border: '1px solid black',
		borderRadius: 5,
		padding: 15,
	},
	formGroup: {
		display: 'flex',
		flexDirection: 'row',
	},
}))

function DriverZones({ zones }) {
	const classes = useStyles()
	const [selectedZones, setSelectedZones] = useState([])
	const [selectAll, setSelectAll] = useState([])

	const handleChange = (id) => {
		selectedZones.includes(id)
			? setSelectedZones((prev) => prev.filter((zone) => zone !== id))
			: setSelectedZones([...selectedZones, id])
	}

	const handleChangeAll = (key, values) => {
		if (selectAll.includes(key)) {
			setSelectAll((prev) => prev.filter((zone) => zone !== key))
			values.map((value) =>
				setSelectedZones((prev) => prev.filter((zone) => zone !== value.id))
			)
		} else {
			setSelectAll([...selectAll, key])
			values.map((value) =>
				setSelectedZones((prev) =>
					selectedZones.includes(value.id) ? prev : [...prev, value.id]
				)
			)
		}
	}

	return (
		<div>
			<FormControl component='fieldset' className={classes.formControl}>
				<FormLabel component='legend'>Zones</FormLabel>
				<FormGroup>
					{Object.entries(zones).map(([key, values]) => (
						<div key={key} className={classes.zonesWrapper}>
							<FormControlLabel
								control={
									<Checkbox
										checked={selectAll.includes(key)}
										onChange={() => handleChangeAll(key, values)}
										name='selectAll'
									/>
								}
								labelPlacement='top'
								label={key}
							/>

							<FormControl
								component='fieldset'
								className={classes.zonesContainer}
							>
								<FormLabel component='legend'>{key}</FormLabel>
								<FormGroup className={classes.formGroup}>
									{values.map((value) => (
										<FormControlLabel
											key={value.id}
											control={
												<Checkbox
													checked={selectedZones.includes(
														value.id
													)}
													onChange={() => handleChange(value.id)}
													name={value.name}
												/>
											}
											label={value.name}
										/>
									))}
								</FormGroup>
							</FormControl>
						</div>
					))}
				</FormGroup>
			</FormControl>
		</div>
	)
}

export default DriverZones

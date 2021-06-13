import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiPhoneNumber from 'material-ui-phone-number'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Grid from '@material-ui/core/Grid'
import { KeyboardDatePicker } from '@material-ui/pickers'
import FormHelperText from '@material-ui/core/FormHelperText'
import 'date-fns'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
		display: 'flex',
		flexDirection: 'column',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	datePicker: {
		width: '100%',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
}))

const Gender = ({ handleChange, errors, touched }) => {
	return (
		<FormControl
			component='fieldset'
			error={errors.gender && touched.gender ? true : false}
		>
			<FormLabel component='legend'>Gender</FormLabel>
			<RadioGroup
				aria-label='gender'
				name='gender1'
				// value={gender}
				onChange={handleChange}
			>
				<FormControlLabel
					value='male'
					name='gender'
					control={<Radio />}
					label='Male'
				/>
				<FormControlLabel
					value='female'
					control={<Radio />}
					label='Female'
					name='gender'
				/>
			</RadioGroup>
			<FormHelperText>{errors.gender}</FormHelperText>
		</FormControl>
	)
}

const DatePicker = () => {
	const classes = useStyles()
	const [selectedDate, setSelectedDate] = useState(new Date())

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	return (
		<Grid container>
			<KeyboardDatePicker
				className={classes.datePicker}
				margin='normal'
				id='date-picker-dialog'
				label='Date of birth'
				format='yyyy/MM/dd'
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</Grid>
	)
}

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email'),
	gender: Yup.string().required('A radio option is required'),
})

function UserFields() {
	const classes = useStyles()

	const { errors, handleSubmit, handleChange, handleBlur, touched } =
		useFormik({
			initialValues: {
				firstName: '',
				lastName: '',
				email: '',
				gender: '',
			},
			validationSchema: SignupSchema,
			onSubmit: (values) => {
				alert(JSON.stringify(values, null, 2))
			},
		})

	return (
		<form className={classes.root} autoComplete='off' onSubmit={handleSubmit}>
			<TextField
				error={errors.firstName && touched.firstName ? true : false}
				variant='outlined'
				type='text'
				id='firstName'
				name='firstName'
				label='First Name'
				placeholder='First name'
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={
					errors.firstName && touched.firstName ? errors.firstName : null
				}
			/>

			<TextField
				error={errors.lastName && touched.lastName ? true : false}
				variant='outlined'
				type='text'
				id='lastName'
				name='lastName'
				label='Last name'
				placeholder='Last name'
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={
					errors.lastName && touched.lastName ? errors.lastName : null
				}
			/>

			<TextField
				error={errors.email && touched.email ? true : false}
				variant='outlined'
				type='email'
				id='email'
				name='email'
				label='Email'
				placeholder='test@test.com'
				required={false}
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={errors.email && touched.email ? errors.email : null}
			/>

			<Gender
				handleChange={handleChange}
				errors={errors}
				touched={touched}
			/>

			<DatePicker />

			<MuiPhoneNumber
				name='phone'
				variant='outlined'
				label='Phone Number'
				data-cy='user-phone'
				onlyCountries={['lb']}
				// onChange={handleChange}
				countryCodeEditable={false}
				defaultCountry={'lb'}
				disabled
			/>

			<Button
				variant='contained'
				color='primary'
				type='submit'
				className={classes.button}
			>
				Submit
			</Button>
		</form>
	)
}

export default UserFields

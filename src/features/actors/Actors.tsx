import React from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import MediaTypeCheckbox from 'shared/components/MediaTypeCheckbox';
import { Typography } from '@material-ui/core';
import { findMovie } from 'services/movie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
		},
		formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const submitQuery = async () => {
	console.log("clicked button");
	console.log(await findMovie([287, 819]))
}

const Actors: React.FC = () => {  // functional component 
	const classes = useStyles();

	const [yearCutoff, setYearCutoff] = React.useState('');
	const [includeTV, setIncludeTV] = React.useState(true);
	const [includeMovies, setIncludeMovies] = React.useState(true);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYearCutoff(event.target.value as string);
	};
	
	const toggleTVCheckbox = (checked: boolean) => {
		setIncludeTV(checked);
	};

	const toggleMoviesCheckbox = (checked: boolean) => {
		setIncludeMovies(checked);
	};


  return (
		<div>
			<form className={classes.root} noValidate autoComplete="off">

				{/* Instructions */}
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
					<Typography>Enter the names of two actors to find out what films they've worked on together.</Typography>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>

				{/* Actor search fields */}
				<Grid container spacing={4} alignItems="center">

					<Grid item xs={2}></Grid>

					<Grid item xs={4}>
						<TextField 
							id="form-field-1" 
							variant="filled"
							fullWidth
							label="Actor name..." 
							color="secondary" 
							placeholder="Actor name"/>
					</Grid>

					{/* Right field */}
					<Grid item xs={4}>
						<TextField 
							id="form-field-2"
							variant="filled" 
							fullWidth 
							label="Another actor name..." 
							color="secondary"
							placeholder="Another actor name"/>
					</Grid>

					<Grid item xs={2}></Grid>
				</Grid>

				{/* Search filter fields */}
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={2}></Grid>

					<Grid item xs={8}>
						<InputLabel shrink id="yearCutoff-select-label">
							Only include shows from the past...
						</InputLabel>

						<FormControl style={{minWidth: 220, marginRight: 50}}>
							<Select
								labelId="yearCutoff-select-label"
								id="yearCutoff-select"
								value={yearCutoff}
								onChange={handleChange}
								displayEmpty
								className={classes.selectEmpty}
								labelWidth={labelWidth}
							>
								<option value="">All years</option>
								<option value={5}>5 years</option>
								<option value={15}>15 years</option>
								<option value={30}>30 years</option>
							</Select>
						</FormControl>

						<Grid item>
							<MediaTypeCheckbox checked={includeTV} onChange={toggleTVCheckbox} label="TV shows" />
						</Grid>

						<Grid item>
							<MediaTypeCheckbox checked={includeMovies} onChange={toggleMoviesCheckbox} label="Movies" />
						</Grid>

						<Grid item>
							<Button variant="contained" color="primary" size="large" onClick={submitQuery}>Find shows in common!</Button>
						</Grid>
					</Grid>

					<Grid item xs={2}></Grid>

				</Grid>
 
			</form>
		</div>
	);
}

export default Actors;
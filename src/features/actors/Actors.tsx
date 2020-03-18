import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import MediaTypeCheckbox from 'shared/components/MediaTypeCheckbox';
import ResultsList from 'features/actors/components/ResultsList';

import { Typography, ListItemText } from '@material-ui/core';
import { findMoviesInCommon } from 'services/movie';
import { findActorByName } from 'services/actor';
import { IMovie, IMovieResult } from 'shared/models/movie.model';
import ActorNameInput from './components/ActorNameInput';

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



const Actors: React.FC = () => {  // functional component 
	const classes = useStyles();

	const [movieResults, setMovieResults] = useState<IMovie | null>(null);
	const [yearCutoff, setYearCutoff] = useState('');
	const [includeTV, setIncludeTV] = useState(true);
	const [includeMovies, setIncludeMovies] = useState(true);
	const [labelWidth, setLabelWidth] = useState(0);
	const [actorName, setActorName] = useState('');
	
	const submitQuery = async () => {
		const actor1 = await findActorByName("Johnny Depp");
		var actorID1 = actor1.results[0]['id'];

		const actor2 = await findActorByName("Helena Bonham Carter");
		var actorID2 = actor2.results[0]['id'];

		const movies = await findMoviesInCommon([actorID1, actorID2]); //287, 819
		setMovieResults(movies);
	}

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYearCutoff(event.target.value as string);
	};
	
	const toggleTVCheckbox = (checked: boolean) => {
		setIncludeTV(checked);
	};

	const toggleMoviesCheckbox = (checked: boolean) => {
		setIncludeMovies(checked);
	};

	const inputActorName = (event: any) => {
		console.log(event)
		setActorName(event.target.value);
	};


  return (
		<div>
			<form className={classes.root} noValidate autoComplete="off">
				{/* Instructions */}
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
					<Typography variant="h5">
							Search by actor names
						</Typography>

					<Typography>Enter the names of two actors to find out what films they've worked on together.</Typography>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>

				{/* Actor search fields */}
				<Grid container spacing={4} alignItems="center">

					<Grid item xs={2}></Grid>

					<Grid item xs={4}>
						<ActorNameInput 
							id="actor-name-input-1" 
							name={actorName}
							handleChange={inputActorName}
						/>
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

			{/* only show this section once movieResults has data */}
			{movieResults && 
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={2}></Grid>

					<Grid item xs={8}>
						{/* Title varies with filters */}
						<Typography variant="h5">
							Shows in common
						</Typography>

						<ResultsList results={movieResults.results} />

					</Grid>

					<Grid item xs={2}></Grid>
				</Grid>
			}

		</div>
	);
}

export default Actors;
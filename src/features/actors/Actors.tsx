import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MediaTypeCheckbox from 'shared/components/MediaTypeCheckbox';
import ResultsList from 'features/actors/components/ResultsList';

import { Typography, Box } from '@material-ui/core';
import { findMoviesInCommon } from 'services/movie';
import { findActorByName, getActorCredits } from 'services/actor';
import { IMovie } from 'shared/models/movie.model';

import ActorNameInput from './components/ActorNameInput';
import YearFilters from './components/YearFilters';

const popularPairs = [
	{name1: "Tom Hanks", name2: "Meg Ryan"},
	{name1: "Emma Stone", name2: "Ryan Gosling"},
	{name1: "Bradley Cooper", name2: "Jennifer Lawrence"},
	{name1: "Jon Favreau", name2: "Vince Vaughn"},
	{name1: "Nick Frost", name2: "Simon Pegg"},
	{name1: "Helena Bonham Carter", name2: "Johnny Depp"},
	{name1: "Angelina Jolie", name2: "Brad Pitt"},
	{name1: "David Tennant", name2: "Olivia Colman"},
	{name1: "Kate Winslet", name2: "Leonardo DiCaprio"},
	{name1: "Julia Roberts", name2: "Richard Gere"},
	{name1: "Ben Affleck", name2: "Matt Damon"},
	{name1: "Ben Stiller", name2: "Owen Wilson"},
	{name1: "James Franco", name2: "Seth Rogen"},
	{name1: "Joan Cusack", name2: "John Cusack"},
	{name1: "Adam Sandler", name2: "Rob Schneider"},
];

/* Some actor IDs, useful for testing 
		1204 - Julia Roberts

		20049 - David Tennant
		26076 - Billie Piper
*/

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
  }),
);


const Actors: React.FC = () => {  // functional component 
	const classes = useStyles();

	const [movieResults, setMovieResults] = useState<IMovie | null>(null);
	const [yearCutoff, setYearCutoff] = useState('');
	const [includeTV, setIncludeTV] = useState(true);
	const [includeMovies, setIncludeMovies] = useState(true);
	const [actorName1, setActorName1] = useState('');
	const [actorName2, setActorName2] = useState('');
	const [examplePair, setExamplePair] = useState({});
	const [actorID1, setActorID1] = useState(0);
	const [actorID2, setActorID2] = useState(0);

	const [actorCredits1, setActorCredits1] = useState();
	const [actorCredits2, setActorCredits2] = useState();

	React.useEffect(() => {
		chooseExamplePair();
	}, []);
	
	function chooseExamplePair() {
		setExamplePair(popularPairs[Math.floor(Math.random()*popularPairs.length)]);
	}

	const submitQuery = async () => {
		const movies = await findMoviesInCommon([actorID1, actorID2]);
		setMovieResults(movies);

		const actorCredits1 = await getActorCredits(actorID1);
		const actorCredits2 = await getActorCredits(actorID2);

		console.log(actorCredits1);
	}

	const changeYearCutoff = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYearCutoff(event.target.value as string);
	};
	
	const toggleTVCheckbox = (checked: boolean) => {
		setIncludeTV(checked);
	};

	const toggleMoviesCheckbox = (checked: boolean) => {
		setIncludeMovies(checked);
	};

	const inputActorName1 = (event: any) => {
		setActorName1(event.target.value);
	};

	const inputActorName2 = (event: any) => {
		setActorName2(event.target.value);
	};

  return (
		<div>
			<form className={classes.root} noValidate autoComplete="off">
				{/* Instructions */}
				<Box bgcolor="white">
				<Grid container spacing={2} direction="column" alignItems="center" justify="center">

					<Grid item xs={12}>

						<Box textAlign="center" pt={4}>
							<Typography variant="h4">Search by actor names</Typography>
							<p>Enter the names of two actors to find out what films they've worked on together.</p>
						</Box>

						{/* Actor search fields */}
						<Box textAlign="center" p={2}>
							<Grid container spacing={2} direction="row">
								<Grid item xs={12} md={6}>
									<ActorNameInput 
										id="actor-name-input-1" 
										label="An actor's name"
										exampleName={examplePair['name1']}
										name={actorName1}
										handleChange={inputActorName1}
										setActorID={setActorID1}
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<ActorNameInput 
										id="actor-name-input-2" 
										label="Another actor's name"
										exampleName={examplePair['name2']}
										name={actorName2}
										handleChange={inputActorName2}
										setActorID={setActorID2}
									/>
								</Grid>
							</Grid>
						</Box>

						{/* Search filter fields */}
						<Typography variant="h5">Search filters</Typography>

						<YearFilters yearCutoff={yearCutoff} handleChange={changeYearCutoff}/>

						<Grid item>
							<MediaTypeCheckbox checked={includeTV} onChange={toggleTVCheckbox} label="TV shows" />
						</Grid>

						<Grid item>
							<MediaTypeCheckbox checked={includeMovies} onChange={toggleMoviesCheckbox} label="Movies" />
						</Grid>

						{/* Submit form button */}
						<Grid item>
							<Box textAlign="center" p={4}>
								<Button variant="contained" color="primary" size="large" onClick={submitQuery}>Find shows in common!</Button>
							</Box>
						</Grid>

						</Grid>
					</Grid>
					</Box>
			</form>

			{/* only show this section once movieResults has data */}
			{movieResults && 
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={2}></Grid>

					<Grid item xs={8}>
						{/* Title varies with filters */}
						<Typography variant="h4">
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
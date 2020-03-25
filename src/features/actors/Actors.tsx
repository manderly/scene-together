import React, { useState, useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MediaTypeCheckbox from 'shared/components/MediaTypeCheckbox';
import ResultsList from 'features/actors/components/ResultsList';

import { Typography, Box } from '@material-ui/core';
import { getActorCredits } from 'services/actor';

import ActorNameInput from './components/ActorNameInput';
import YearFilters from './components/YearFilters';

import { chooseExampleActorPair } from 'services/popularPairs';

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

	//const [movieResults, setMovieResults] = useState<IMovie | null>(null);
	const [yearCutoff, setYearCutoff] = useState('');
	const [includeTV, setIncludeTV] = useState(true);
	const [includeMovies, setIncludeMovies] = useState(true);
	const [actorName1, setActorName1] = useState('');
	const [actorName2, setActorName2] = useState('');
	const [examplePair, setExamplePair] = useState({});
	const [actorID1, setActorID1] = useState<number | null>(0);
	const [actorID2, setActorID2] = useState<number | null>(0);
	const [results, setResults] = useState([]);

	// we can also set error messages to display to the user
  const [actorNameError1, setActorNameError1] = useState<string | null>(null);
	const [actorNameError2, setActorNameError2] = useState<string | null>(null);

	// This was helpful in figuring out how to do form validation
	// https://medium.com/@kitson.broadhurst/simple-form-validation-with-react-hooks-usestate-and-useeffect-57620d808cc8 
  const formValidation = () => {
		let isValid = false;

    if (!actorID1 || actorID1 === 0) {
      setActorNameError1('Name cant be blank!');
		}
		
		if (!actorID2 || actorID2 === 0) {
			setActorNameError2('Name cant be blank!');
		}

		if (actorID1 && actorID1 > 0) {
      setActorNameError1(null);
		}

		if (actorID2 && actorID2 > 0) {
			setActorNameError2(null);
		}

		if (actorID1 && actorID2) {
			isValid = true;
		}

		return isValid;
  }

	React.useEffect(() => {
		setExamplePair(chooseExampleActorPair()); // gets it from popularPairs service
	}, []);

	const submitQuery = async () => {
		var matches = [];

		/* If the user only wants movies, that's easy - there's an API call just for movies that include actor IDs*/
		//const movies = await findMoviesInCommon([actorID1, actorID2]);
		//setMovieResults(movies);

		/* But we want to get movies, TV, or both - so we get the actor credits and find overlaps */
		let actorCredits1 = [];
		let actorCredits2 = [];

		if (actorID1) {
			actorCredits1 = await getActorCredits(actorID1);
		}

		if (actorID2) {
			actorCredits2 = await getActorCredits(actorID2);
		}

		// if media_type = "movie", then use "title"
		// if media_type = "tv", then use "name"
		// tv shows with an undefined name are talk shows 
		actorCredits1.forEach((val) => {
			// todo: check user's filters and don't show tv or movies if unchecked
			if (includeTV && val['media_type'] === 'tv' && val['name'] !== undefined && val['character'] !== '') {
				const match = actorCredits2.find((res) => res['name'] === val['name'] && res['name'] !== undefined && res['character'] !== '');
				if (match) {
					matches.push(match);
				}
			} else if (includeMovies && val['media_type'] === 'movie') {
				const match = actorCredits2.find((res) => res['title'] === val['title']);
				if (match) {
					matches.push(match);
				}
			}
		});

		matches.sort((a, b) => (a['release_date'] > b['release_date'] || a['first_air_date'] > b['first_air_date']) ? -1: 1);
		console.log(matches);
		setResults(matches);
	};

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

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (formValidation()) {
			submitQuery();
		} // else, form contains errors
	 }

  return (
		<div>
			<form className={classes.root} noValidate autoComplete="off" onSubmit={ handleSubmit }>
				{/* Instructions */}
				<Box>
				<Grid container spacing={2} direction="column" alignItems="center" justify="center">

					<Grid item xs={12}>

						<Box textAlign="center" pt={4}>
							<Typography variant="h4" color="textPrimary">Search by actor names</Typography>
							<Typography color="primary"><p>Enter the names of two actors to find out what films they've worked on together.</p></Typography>
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
										error={actorNameError1}
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
										error={actorNameError2}
									/>
								</Grid>
							</Grid>
						</Box>

						{/* Search filter fields */}
						<Box p={2}>
						<Typography variant="h6" color="textPrimary">Optional search filters</Typography>
						<br/>
						<YearFilters yearCutoff={yearCutoff} handleChange={changeYearCutoff}/>

						<Grid item>
							<MediaTypeCheckbox checked={includeTV} onChange={toggleTVCheckbox} label="Include TV shows" />
						</Grid>

						<Grid item>
							<MediaTypeCheckbox checked={includeMovies} onChange={toggleMoviesCheckbox} label="Include movies" />
						</Grid>

						{/* Submit form button */}
						<Grid item>
							<Box textAlign="center" p={4}>
								<Button variant="contained" color="primary" size="large" type="submit">Find shows in common!</Button>
							</Box>
						</Grid>
						</Box>

						</Grid>
					</Grid>
					</Box>
			</form>

			{/* only show this section once movieResults has data */}
			{results.length && 
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={2}></Grid>

					<Grid item xs={8}>

						<ResultsList results={results} />

					</Grid>

					<Grid item xs={2}></Grid>
				</Grid>
			}

		</div>
	);
}

export default Actors;
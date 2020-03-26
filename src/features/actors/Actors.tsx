import React, { useState } from 'react';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { getActorCredits } from 'services/actor';

import ActorNameInput from './components/ActorNameInput';

import { chooseExampleActorPair } from 'services/popularPairs';
import { buildInCommonText } from 'services/utils';

import Instructions from 'shared/components/Instructions';
import SubmitFormButton from 'shared/components/SubmitFormButton';
import ResultsContainer from 'shared/components/ResultsContainer';
import SearchFilters from 'shared/components/SearchFilters';
import { Box } from '@material-ui/core';

const Actors: React.FC = () => {  // functional component 

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
	const [inCommonText, setInCommonText] = useState<string>('');

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

	function loadTestData() {
		let sampleData = '[{"id":559969,"character":"Jesse Pinkman","original_title":"El Camino: A Breaking Bad Movie","overview":"In the wake of his dramatic escape from captivity, Jesse Pinkman must come to terms with his past in order to forge some kind of future.","vote_count":2147,"video":false,"media_type":"movie","poster_path":"/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg","backdrop_path":"/2GUcUDSGqQSyIxe7xDxnVTfWQgq.jpg","popularity":40.571,"title":"El Camino: A Breaking Bad Movie","original_language":"en","genre_ids":[28,80,18,53],"vote_average":6.9,"adult":false,"release_date":"2019-10-11","credit_id":"5be34d7a0e0a2614ba01c2cb"},{"id":239459,"character":"Himself","original_title":"No Half Measures: Creating the Final Season of Breaking Bad","overview":"A documentary about the making of season five of the acclaimed AMC series Breaking Bad.","vote_count":77,"video":false,"media_type":"movie","poster_path":null,"backdrop_path":null,"popularity":3.755,"title":"No Half Measures: Creating the Final Season of Breaking Bad","original_language":"zh","genre_ids":[99],"vote_average":8.6,"adult":false,"release_date":"2013-11-26","credit_id":"52fe4e93c3a36847f8299e17"},{"id":238466,"character":"Himself","original_title":"David Blaine: Real or Magic","overview":"David Blaine\'s signature brand of street magic mystifies the most recognisable celebrities in the world, such as Jamie Foxx, Bryan Cranston, Aaron Paul, Ricky Gervais, Katy Perry, Woody Allen, and Robert DeNiro, to name a few. He goes to the homes of Kanye West and Harrison Ford, Will Smith and Olivia Wilde. He pays a visit to Stephen Hawking at his office in Cambridge University. Blaine also travels the world, astonishing people from all walks of life with never-before seen, inconceivable magic.","vote_count":59,"video":false,"media_type":"movie","poster_path":"/j5eamgRa6yJEmkOoxYu80dWkji3.jpg","backdrop_path":"/rc4uhKL1IhQE88cqJlfuoJPUBIC.jpg","popularity":8.532,"title":"David Blaine: Real or Magic","original_language":"en","genre_ids":[99],"vote_average":6.7,"adult":false,"release_date":"2013-11-19","credit_id":"52fe4e7dc3a36847f82938c7"},{"id":1396,"character":"Jesse Pinkman","episode_count":62,"overview":"When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family\'s financial future at any cost as he enters the dangerous world of drugs and crime.","origin_country":["US"],"original_name":"Breaking Bad","genre_ids":[18],"name":"Breaking Bad","media_type":"tv","backdrop_path":"/hbgPoI0GBrXJfGjYNV2fMQU0xou.jpg","popularity":65.528,"first_air_date":"2008-01-20","original_language":"en","vote_count":3973,"vote_average":8.5,"poster_path":"/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg","credit_id":"52542282760ee31328001845"}]';
		let sampleMatches = JSON.parse(sampleData);
		setResults(sampleMatches);
	}

	function isWithinCutoff(date) {
		let isWithinCutoffRange = false;
		if (yearCutoff === '') {
			isWithinCutoffRange = true;
		} else {
			let nowMinusCutoff = moment().subtract(yearCutoff, 'years').format('YYYY-MM-DD');
			if (date < nowMinusCutoff) {
				isWithinCutoffRange = false;
			} else if (date >= nowMinusCutoff) {
				isWithinCutoffRange = true;
			} else {
				console.log("Bad date state, check isWithinCutoff");
			}
		}

		return isWithinCutoffRange;
	}

	function isMatch(val: any, res: any, paramStr: string) {
		let isMatch = false;
		if (res[paramStr] === val[paramStr]) {
			isMatch = true;
		}
		return isMatch;
	}

	function isValidTVCredit(credit: any) {
		let isValid = false;

		if (includeTV && 
					credit['media_type'] === 'tv' && 
					credit['name'] !== undefined && 
					credit['character'] !== '' &&
					isWithinCutoff(credit['first_air_date'])) {
			isValid = true;
		}
		return isValid;
	}

	function isValidMovieCredit(credit: any) {
		let isValid = false;
		if (includeMovies && credit['media_type'] === 'movie' && isWithinCutoff(credit['release_date'])) {
			isValid = true;
		}
		return isValid;
	}

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
			if (isValidTVCredit(val)) {
				const match = actorCredits2.find((res) => isMatch(res, val, 'name') && isValidTVCredit(res));
				if (match) {
					matches.push(match);
				}
			} else if (includeMovies && isValidMovieCredit(val)) {
				const match = actorCredits2.find((res) => isMatch(res, val, 'title'));
				if (match) {
					matches.push(match);
				}
			}
		});

		matches.sort((a, b) => (a['release_date'] > b['release_date'] || a['first_air_date'] > b['first_air_date']) ? -1: 1);
		console.log(JSON.stringify(matches));
		setResults(matches);
	};

	// These are duplicated in Shows.tsx
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
			setInCommonText(buildInCommonText(includeTV, includeMovies));
			submitQuery();
		} // else, form contains errors
	 }

  return (
		<div>
			<form noValidate onSubmit={ handleSubmit }>
				{/* Instructions */}
				<Box>
				<Grid container spacing={2} direction="column" alignItems="center" justify="center">
					<Grid item xs={12}>

						<Instructions
							title="Search by actor names"
							subtitle="Enter the names of two actors to find out what films they've worked on together."
						/>

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

						<Box p={2}>
							<SearchFilters 
								yearCutoff={yearCutoff}
								handleYearCutoffChange={changeYearCutoff}
								tvChecked={includeTV}
								handleTVCheckedChange={toggleTVCheckbox}
								moviesChecked={includeMovies}
								handleMoviesCheckedChange={toggleMoviesCheckbox}
								/>

							<SubmitFormButton buttonText="Find shows in common!" />
							
						</Box>

						<Button variant="contained" color="primary" onClick={loadTestData}>LOAD TEST DATA</Button>

						</Grid>
					</Grid>
					</Box>
			</form>

			<ResultsContainer inCommonText={inCommonText} results={results}/>
			
		</div>
	);
}

export default Actors;
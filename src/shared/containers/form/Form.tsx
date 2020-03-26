import React, { useState } from 'react';

import { Box, Grid, Button } from '@material-ui/core';
import ActorNameInput from 'features/actors/components/ActorNameInput';
import SearchFilters from 'shared/components/SearchFilters';
import SubmitFormButton from 'shared/components/SubmitFormButton';
import ResultsContainer from 'shared/components/ResultsContainer';
import { chooseExampleActorPair, chooseExampleShowPair } from 'services/popularPairs';

import { buildInCommonText } from 'services/utils';
import { searchTypes } from 'shared/enums/enums';
import { getActorCredits } from 'services/actor';

import { isValidMovieCredit, isValidTVCredit, isMatch } from 'services/validations';

// define the params here 
interface IForm {
  searchType: searchTypes;
}

const Form: React.FC<IForm> = ({ searchType }) => {  // functional component 

  const [yearCutoff, setYearCutoff] = useState('');
	const [includeTV, setIncludeTV] = useState(true);
  const [includeMovies, setIncludeMovies] = useState(true);

  const [ID1, setID1] = useState<number | null>(0);
  const [ID2, setID2] = useState<number | null>(0);

  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const [results, setResults] = useState([]);
  
  const [labelText, setLabelText] = useState({});
  const [examplePair, setExamplePair] = useState({});
  
  const [inCommonText, setInCommonText] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');

  // we can also set error messages to display to the user
  const [inputError1, setInputError1] = useState<string | null>(null);
  const [inputError2, setInputError2] = useState<string | null>(null);

  // This was helpful in figuring out how to do form validation
	// https://medium.com/@kitson.broadhurst/simple-form-validation-with-react-hooks-usestate-and-useeffect-57620d808cc8 
  const formValidation = () => {
		let isValid = false;

    if (!ID1 || ID1 === 0) {
      setInputError1('Field cant be blank!');
		}
		
		if (!ID2 || ID2 === 0) {
			setInputError2('Field cant be blank!');
		}

		if (ID1 && ID1 > 0) {
      setInputError1(null);
		}

		if (ID2 && ID2 > 0) {
			setInputError2(null);
		}

		if (ID1 && ID2) {
			isValid = true;
		}

		return isValid;
  }
  
  function loadTestData() {
    let sampleData = '';
    if (searchType === searchTypes.byActors) {
      sampleData = '[{"id":559969,"character":"Jesse Pinkman","original_title":"El Camino: A Breaking Bad Movie","overview":"In the wake of his dramatic escape from captivity, Jesse Pinkman must come to terms with his past in order to forge some kind of future.","vote_count":2147,"video":false,"media_type":"movie","poster_path":"/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg","backdrop_path":"/2GUcUDSGqQSyIxe7xDxnVTfWQgq.jpg","popularity":40.571,"title":"El Camino: A Breaking Bad Movie","original_language":"en","genre_ids":[28,80,18,53],"vote_average":6.9,"adult":false,"release_date":"2019-10-11","credit_id":"5be34d7a0e0a2614ba01c2cb"},{"id":239459,"character":"Himself","original_title":"No Half Measures: Creating the Final Season of Breaking Bad","overview":"A documentary about the making of season five of the acclaimed AMC series Breaking Bad.","vote_count":77,"video":false,"media_type":"movie","poster_path":null,"backdrop_path":null,"popularity":3.755,"title":"No Half Measures: Creating the Final Season of Breaking Bad","original_language":"zh","genre_ids":[99],"vote_average":8.6,"adult":false,"release_date":"2013-11-26","credit_id":"52fe4e93c3a36847f8299e17"},{"id":238466,"character":"Himself","original_title":"David Blaine: Real or Magic","overview":"David Blaine\'s signature brand of street magic mystifies the most recognisable celebrities in the world, such as Jamie Foxx, Bryan Cranston, Aaron Paul, Ricky Gervais, Katy Perry, Woody Allen, and Robert DeNiro, to name a few. He goes to the homes of Kanye West and Harrison Ford, Will Smith and Olivia Wilde. He pays a visit to Stephen Hawking at his office in Cambridge University. Blaine also travels the world, astonishing people from all walks of life with never-before seen, inconceivable magic.","vote_count":59,"video":false,"media_type":"movie","poster_path":"/j5eamgRa6yJEmkOoxYu80dWkji3.jpg","backdrop_path":"/rc4uhKL1IhQE88cqJlfuoJPUBIC.jpg","popularity":8.532,"title":"David Blaine: Real or Magic","original_language":"en","genre_ids":[99],"vote_average":6.7,"adult":false,"release_date":"2013-11-19","credit_id":"52fe4e7dc3a36847f82938c7"},{"id":1396,"character":"Jesse Pinkman","episode_count":62,"overview":"When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family\'s financial future at any cost as he enters the dangerous world of drugs and crime.","origin_country":["US"],"original_name":"Breaking Bad","genre_ids":[18],"name":"Breaking Bad","media_type":"tv","backdrop_path":"/hbgPoI0GBrXJfGjYNV2fMQU0xou.jpg","popularity":65.528,"first_air_date":"2008-01-20","original_language":"en","vote_count":3973,"vote_average":8.5,"poster_path":"/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg","credit_id":"52542282760ee31328001845"}]';
    } else {
      sampleData = '[{"id":559969,"character":"Jesse Pinkman","original_title":"El Camino: A Breaking Bad Movie","overview":"In the wake of his dramatic escape from captivity, Jesse Pinkman must come to terms with his past in order to forge some kind of future.","vote_count":2147,"video":false,"media_type":"movie","poster_path":"/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg","backdrop_path":"/2GUcUDSGqQSyIxe7xDxnVTfWQgq.jpg","popularity":40.571,"title":"El Camino: A Breaking Bad Movie","original_language":"en","genre_ids":[28,80,18,53],"vote_average":6.9,"adult":false,"release_date":"2019-10-11","credit_id":"5be34d7a0e0a2614ba01c2cb"},{"id":239459,"character":"Himself","original_title":"No Half Measures: Creating the Final Season of Breaking Bad","overview":"A documentary about the making of season five of the acclaimed AMC series Breaking Bad.","vote_count":77,"video":false,"media_type":"movie","poster_path":null,"backdrop_path":null,"popularity":3.755,"title":"No Half Measures: Creating the Final Season of Breaking Bad","original_language":"zh","genre_ids":[99],"vote_average":8.6,"adult":false,"release_date":"2013-11-26","credit_id":"52fe4e93c3a36847f8299e17"},{"id":238466,"character":"Himself","original_title":"David Blaine: Real or Magic","overview":"David Blaine\'s signature brand of street magic mystifies the most recognisable celebrities in the world, such as Jamie Foxx, Bryan Cranston, Aaron Paul, Ricky Gervais, Katy Perry, Woody Allen, and Robert DeNiro, to name a few. He goes to the homes of Kanye West and Harrison Ford, Will Smith and Olivia Wilde. He pays a visit to Stephen Hawking at his office in Cambridge University. Blaine also travels the world, astonishing people from all walks of life with never-before seen, inconceivable magic.","vote_count":59,"video":false,"media_type":"movie","poster_path":"/j5eamgRa6yJEmkOoxYu80dWkji3.jpg","backdrop_path":"/rc4uhKL1IhQE88cqJlfuoJPUBIC.jpg","popularity":8.532,"title":"David Blaine: Real or Magic","original_language":"en","genre_ids":[99],"vote_average":6.7,"adult":false,"release_date":"2013-11-19","credit_id":"52fe4e7dc3a36847f82938c7"},{"id":1396,"character":"Jesse Pinkman","episode_count":62,"overview":"When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family\'s financial future at any cost as he enters the dangerous world of drugs and crime.","origin_country":["US"],"original_name":"Breaking Bad","genre_ids":[18],"name":"Breaking Bad","media_type":"tv","backdrop_path":"/hbgPoI0GBrXJfGjYNV2fMQU0xou.jpg","popularity":65.528,"first_air_date":"2008-01-20","original_language":"en","vote_count":3973,"vote_average":8.5,"poster_path":"/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg","credit_id":"52542282760ee31328001845"}]';
    }

		let sampleMatches = JSON.parse(sampleData);
		setResults(sampleMatches);
  }
  
  React.useEffect(() => {
     // gets it from popularPairs service
    if (searchType === searchTypes.byActors) {
      setExamplePair(chooseExampleActorPair());
      setLabelText({label1: 'Actor name', label2: 'Another actor name'});
      setButtonText('Find shows in common!');
    } else if (searchType === searchTypes.byShows) {
      setExamplePair(chooseExampleShowPair());
      setLabelText({label1: 'Name of a TV show or movie', label2: 'Another TV show or movie'});
      setButtonText('Find actors in common!');
    } else {
      console.log("invalid search type, check Form.tsx");
    }
  }, [searchType]);

  const submitQuery = async () => {
    var matches = [];

    /* Get the actor credits and find overlaps */
    let actorCredits1 = [];
    let actorCredits2 = [];

    if (ID1) {
      actorCredits1 = await getActorCredits(ID1);
    }

    if (ID2) {
      actorCredits2 = await getActorCredits(ID2);
    }

    // if media_type = "movie", then use "title"
    // if media_type = "tv", then use "name"
    // tv shows with an undefined name are talk shows 
    actorCredits1.forEach((val) => {
      if (includeTV && isValidTVCredit(yearCutoff, val)) {
        const match = actorCredits2.find((res) => isMatch(res, val, 'name') && isValidTVCredit(yearCutoff, res));
        if (match) {
          matches.push(match);
        }
      } else if (includeMovies && isValidMovieCredit(yearCutoff, val)) {
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

  // these are exactly the same in Actors.tsx and should be moved somewhere both Actors and Shows can access
  const changeYearCutoff = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYearCutoff(event.target.value as string);
  };
  
  const toggleTVCheckbox = (checked: boolean) => {
    setIncludeTV(checked);
  };

  const toggleMoviesCheckbox = (checked: boolean) => {
    setIncludeMovies(checked);
  };
  
  const inputName1 = (event: any) => {
    setName1(event.target.value);
  };

  const inputName2 = (event: any) => {
    setName2(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
		if (formValidation()) {
      if (searchType === searchTypes.byActors) {
        setInCommonText(buildInCommonText(includeMovies, includeTV));
      } else if (searchType === searchTypes.byShows) {
        setInCommonText('Actors in common');
      }
      submitQuery();
    }
  }

  return (
    <div>
      <form noValidate onSubmit={ handleSubmit }>
        {/* Instructions */}
        <Box>
        <Grid container spacing={2} direction="column" alignItems="center" justify="center">
          <Grid item xs={12}>

            {/* Actor search fields */}
            <Box textAlign="center" p={2}>
              <Grid container spacing={2} direction="row">
                <Grid item xs={12} md={6}>
                  <ActorNameInput 
                    id="input-1" 
                    label={labelText['label1']}
                    exampleName={examplePair['name1']}
                    name={name1}
                    handleChange={inputName1}
                    setActorID={setID1}
                    error={inputError1}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <ActorNameInput 
                    id="input-2" 
                    label={labelText['label2']}
                    exampleName={examplePair['name2']}
                    name={name2}
                    handleChange={inputName2}
                    setActorID={setID2}
                    error={inputError2}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box p={2}>
              {searchType === searchTypes.byActors &&
              <SearchFilters 
                yearCutoff={yearCutoff}
                handleYearCutoffChange={changeYearCutoff}
                tvChecked={includeTV}
                handleTVCheckedChange={toggleTVCheckbox}
                moviesChecked={includeMovies}
                handleMoviesCheckedChange={toggleMoviesCheckbox}
                />
              }

              <SubmitFormButton buttonText={buttonText} />
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

export default Form;
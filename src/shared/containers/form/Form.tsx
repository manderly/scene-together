import React, { useState } from 'react';

import { Box, Grid, Button } from '@material-ui/core';
import NameInput from 'features/actors/components/NameInput';
import SearchFilters from 'shared/components/SearchFilters';
import SubmitFormButton from 'shared/components/SubmitFormButton';
import ResultsContainer from 'shared/components/ResultsContainer';
import { chooseExampleActorPair, chooseExampleShowPair } from 'services/popularPairs';

import { buildInCommonText, sortShowsByReleaseDate } from 'services/utils';
import { searchTypes } from 'shared/enums/enums';
import { getActorCredits } from 'services/actor';
import { getTVShowCredits, getMovieCredits, getTVShowSeasonCount, getTVShowCreditsBySeason } from 'services/show';

import { isValidMovieCredit, isValidTVCredit, isMatch } from 'services/validations';
import { Show } from 'shared/models/show.model';

// define the params here 
interface IForm {
  searchType: searchTypes;
}

const Form: React.FC<IForm> = ({ searchType }) => {  // functional component 

  const [yearCutoff, setYearCutoff] = useState('');
	const [includeTV, setIncludeTV] = useState(true);
  const [includeMovies, setIncludeMovies] = useState(true);

  const [value1, setValue1] = useState<Show | null>(null);
  const [value2, setValue2] = useState<Show | null>(null);

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

    if (!value1 || value1.id === 0) {
      setInputError1('Field cant be blank!');
		}
		
		if (!value2 || value2.id === 0) {
			setInputError2('Field cant be blank!');
		}

		if (value1 && value1.id > 0) {
      setInputError1(null);
		}

		if (value2 && value2.id > 0) {
			setInputError2(null);
		}

		if (value1 && value1.id && value2 && value2.id) {
			isValid = true;
		}

		return isValid;
  }
  
  function loadTestData() {
    let sampleData = '';
    if (searchType === searchTypes.byActors) {
      sampleData = '[{"id":559969,"character":"Jesse Pinkman","original_title":"El Camino: A Breaking Bad Movie","overview":"In the wake of his dramatic escape from captivity, Jesse Pinkman must come to terms with his past in order to forge some kind of future.","vote_count":2147,"video":false,"media_type":"movie","poster_path":"/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg","backdrop_path":"/2GUcUDSGqQSyIxe7xDxnVTfWQgq.jpg","popularity":40.571,"title":"El Camino: A Breaking Bad Movie","original_language":"en","genre_ids":[28,80,18,53],"vote_average":6.9,"adult":false,"release_date":"2019-10-11","credit_id":"5be34d7a0e0a2614ba01c2cb"},{"id":239459,"character":"Himself","original_title":"No Half Measures: Creating the Final Season of Breaking Bad","overview":"A documentary about the making of season five of the acclaimed AMC series Breaking Bad.","vote_count":77,"video":false,"media_type":"movie","poster_path":null,"backdrop_path":null,"popularity":3.755,"title":"No Half Measures: Creating the Final Season of Breaking Bad","original_language":"zh","genre_ids":[99],"vote_average":8.6,"adult":false,"release_date":"2013-11-26","credit_id":"52fe4e93c3a36847f8299e17"},{"id":238466,"character":"Himself","original_title":"David Blaine: Real or Magic","overview":"David Blaine\'s signature brand of street magic mystifies the most recognisable celebrities in the world, such as Jamie Foxx, Bryan Cranston, Aaron Paul, Ricky Gervais, Katy Perry, Woody Allen, and Robert DeNiro, to name a few. He goes to the homes of Kanye West and Harrison Ford, Will Smith and Olivia Wilde. He pays a visit to Stephen Hawking at his office in Cambridge University. Blaine also travels the world, astonishing people from all walks of life with never-before seen, inconceivable magic.","vote_count":59,"video":false,"media_type":"movie","poster_path":"/j5eamgRa6yJEmkOoxYu80dWkji3.jpg","backdrop_path":"/rc4uhKL1IhQE88cqJlfuoJPUBIC.jpg","popularity":8.532,"title":"David Blaine: Real or Magic","original_language":"en","genre_ids":[99],"vote_average":6.7,"adult":false,"release_date":"2013-11-19","credit_id":"52fe4e7dc3a36847f82938c7"},{"id":1396,"character":"Jesse Pinkman","episode_count":62,"overview":"When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family\'s financial future at any cost as he enters the dangerous world of drugs and crime.","origin_country":["US"],"original_name":"Breaking Bad","genre_ids":[18],"name":"Breaking Bad","media_type":"tv","backdrop_path":"/hbgPoI0GBrXJfGjYNV2fMQU0xou.jpg","popularity":65.528,"first_air_date":"2008-01-20","original_language":"en","vote_count":3973,"vote_average":8.5,"poster_path":"/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg","credit_id":"52542282760ee31328001845"}]';
    } else if (searchType === searchTypes.byShows) {
      sampleData = '[{"cast_id":5,"character":"Frodo Baggins","credit_id":"52fe4783c3a36847f8139f8f","gender":2,"id":109,"name":"Elijah Wood","order":11,"profile_path":"/ayARmqAe9Aab1zg6FjJG0u9MEBo.jpg"},{"cast_id":6,"character":"Gandalf","credit_id":"52fe4783c3a36847f8139f93","gender":2,"id":1327,"name":"Ian McKellen","order":0,"profile_path":"/yB5775ufqizCWERwNNMYV3NlReT.jpg"},{"cast_id":4,"character":"Gollum","credit_id":"52fe4783c3a36847f8139f8b","gender":2,"id":1333,"name":"Andy Serkis","order":12,"profile_path":"/2aJLwOQK50Lx7PvIHGW1GMytTOL.jpg"},{"cast_id":2,"character":"Galadriel","credit_id":"52fe4783c3a36847f8139f83","gender":1,"id":112,"name":"Cate Blanchett","order":7,"profile_path":"/1Rd567YFdGfkJjSlhNPR8joYkaX.jpg"},{"cast_id":8,"character":"Saruman","credit_id":"52fe4783c3a36847f8139f9b","gender":2,"id":113,"name":"Christopher Lee","order":9,"profile_path":"/yzE2U4sS46sVRyCUKpgs3lYZaMy.jpg"},{"cast_id":16,"character":"Elrond","credit_id":"52fe4783c3a36847f8139fad","gender":2,"id":1331,"name":"Hugo Weaving","order":10,"profile_path":"/n1hM4zsv9XPkkg08Lwf1lnUJPQS.jpg"},{"cast_id":7,"character":"Old Bilbo","credit_id":"52fe4783c3a36847f8139f97","gender":2,"id":65,"name":"Ian Holm","order":8,"profile_path":"/w10RqtxwPV3alOhh0ngR0EJvIB1.jpg"},{"cast_id":138,"character":"Cute Young Hobbit","credit_id":"5ddff5e24f58010012fcf568","gender":0,"id":2082669,"name":"Katie Jackson","order":40,"profile_path":"/1pEjliCPFjprjwCKhmAI8PKo0dC.jpg"},{"cast_id":132,"character":"Master Worrywort","credit_id":"5c8da0870e0a2612f1548fe6","gender":0,"id":67126,"name":"Timothy Bartlett","order":31,"profile_path":null},{"cast_id":21,"character":"Lindir","credit_id":"52fe4783c3a36847f8139fb9","gender":2,"id":105584,"name":"Bret McKenzie","order":32,"profile_path":"/tEP4b5bTpSxJUHOYItg5xrZh43F.jpg"},{"cast_id":135,"character":"Young Thrain","credit_id":"5c8da1afc3a368610b4a0be8","gender":2,"id":1383,"name":"Thomas Robins","order":35,"profile_path":null}]';
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

  const getConsolidatedTVCredits = async (showID: number) => {
    // there's no way to get the tv show's full cast in one fell swoop, so instead we get the season count
    let seasonCount = await getTVShowSeasonCount(showID);

    // and make an API call for each season (ouch), collecting the cast from each response
    let allTVCredits: any[] = [];
    
    if (seasonCount > 0) {
      for (let i = 0; i < seasonCount; i++) {
        allTVCredits.push(await getTVShowCreditsBySeason(showID, i));
      }
    } else {
      console.log("Getting show credits for single-season show");
      allTVCredits.push(await getTVShowCredits(showID));
    }

    // flatten into one array 
    let flattened = [].concat(...allTVCredits);

    // remove the duplicate entries
    const consolidatedTVCredits = flattened.reduce((acc: any[], obj: any) => {
      const val = acc.find((candidate) => candidate.id === obj.id);
      if (!val) {
        return acc.concat(obj);
      } else {
        return acc;
      }

    }, []); // empty [] means "start with empty array"

    console.log(consolidatedTVCredits);
    return consolidatedTVCredits;
  }

  const submitShowQuery = async () => {
    let matches : any[] = [];

    /* Get the shows and find actors they have in common */
    let showCredits1: any[] = [];
    let showCredits2: any[] = [];

    if (value1) {
      if (value1.media_type === "tv") {
        showCredits1 = await getConsolidatedTVCredits(value1.id);
      } else if (value1.media_type === "movie") {
        showCredits1 = await getMovieCredits(value1.id);
      }
    }

    if (value2) {
      if (value2.media_type === "tv") {
        showCredits2 = await getConsolidatedTVCredits(value2.id);
      } else if (value2.media_type === "movie") {
        showCredits2 = await getMovieCredits(value2.id);
      }
    }

    console.log(showCredits1);
    console.log(showCredits2);

    console.log("Now find any objects that share an ID and return just those");
    // could maybe do this more efficiently than stepping through the second array start to finish for each element in the first array
    showCredits1.forEach((val) => {

      let combinedMatch = {};

      const match = showCredits2.find((res) => {
        if (isMatch(res, val, 'id')) {
          // found the same actor in both lists of shows

          console.log(val);
          console.log(res);

          combinedMatch['id'] = val.id;
          combinedMatch['name'] = val.name;
          combinedMatch['characterName1'] = val.character;
          combinedMatch['characterName2'] = res.character;
          combinedMatch['showName1'] = value1?.name;
          combinedMatch['showName2'] = value2?.name;

          return true;
        }
      });

      if (match) {

        console.log("formatted match: ");
        console.log(combinedMatch);
        matches.push(combinedMatch);

        // old way
        //matches.push(match);
      }
    });

    //matches = sortActorsByPopularity(matches);
    
    console.log(JSON.stringify(matches));
    setResults(matches as []);
  }

  const submitActorQuery = async () => {
    let matches : any[] = [];

    /* Get the actor credits and find overlaps */
    let actorCredits1 = [];
    let actorCredits2 = [];

    if (value1) {
      actorCredits1 = await getActorCredits(value1.id);
    }

    if (value2) {
      actorCredits2 = await getActorCredits(value2.id);
    }

    // if media_type = "movie", then use "title"
    // if media_type = "tv", then use "name"
    // tv shows with an undefined name are talk shows 

    // loop through this actor's movie and TV credits, and for each one, loop through the other actor's credits
    // make record of any matches found 
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

    matches = sortShowsByReleaseDate(matches);
    console.log(JSON.stringify(matches));
    setResults(matches as []);
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
        submitActorQuery();
      } else if (searchType === searchTypes.byShows) {
        setInCommonText('Actors in common');
        submitShowQuery();
      }
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
                  <NameInput 
                    id="input-1" 
                    label={labelText['label1']}
                    exampleName={examplePair['name1']}
                    name={name1}
                    handleChange={inputName1}
                    setValue={setValue1}
                    searchType={searchType}
                    error={inputError1}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NameInput 
                    id="input-2" 
                    label={labelText['label2']}
                    exampleName={examplePair['name2']}
                    name={name2}
                    handleChange={inputName2}
                    setValue={setValue2}
                    searchType={searchType}
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

      <ResultsContainer inCommonText={inCommonText} results={results} searchType={searchType}/>
      
    </div>
  );
}

export default Form;
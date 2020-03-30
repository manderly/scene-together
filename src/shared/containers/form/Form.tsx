import React, { useState } from 'react';

import { Box, Grid, Link } from '@material-ui/core';
import NameInput from 'shared/components/NameInput';
import SearchFilters from 'shared/components/SearchFilters/SearchFilters';
import SubmitFormButton from 'shared/components/SubmitFormButton';
import Results from 'shared/components/Results/Results';
import { chooseExampleActorPair, chooseExampleShowPair } from 'services/popularPairs';

import { sortShowsByReleaseDate } from 'services/utils';
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
  const [inCommonTextTitle, setInCommonTextTitle] = useState<string>('');

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
      sampleData = '[{"id":559969,"title":"El Camino: A Breaking Bad Movie","media_type":"movie","release_date":"2019-10-11","actorName1":"Bryan Cranston","actorName2":"Aaron Paul","characterName1":"Walter White","characterName2":"Jesse Pinkman"},{"id":239459,"title":"No Half Measures: Creating the Final Season of Breaking Bad","media_type":"movie","release_date":"2013-11-26","actorName1":"Bryan Cranston","actorName2":"Aaron Paul","characterName1":"Himself","characterName2":"Himself"},{"id":238466,"title":"David Blaine: Real or Magic","media_type":"movie","release_date":"2013-11-19","actorName1":"Bryan Cranston","actorName2":"Aaron Paul","characterName1":"Himself","characterName2":"Himself"},{"id":1396,"name":"Breaking Bad","media_type":"tv","first_air_date":"2008-01-20","actorName1":"Bryan Cranston","actorName2":"Aaron Paul","characterName1":"Walter White","characterName2":"Jesse Pinkman"}]';
    } else if (searchType === searchTypes.byShows) {
      sampleData = '[{"id":31,"name":"Tom Hanks","characterName1":"Sam Baldwin","characterName2":"Joe Fox","showName1":"Sleepless in Seattle","showName2":"You\'ve Got Mail","showID1":858,"showID2":9489,"showType1":"movie","showType2":"movie"},{"id":5344,"name":"Meg Ryan","characterName1":"Annie Reed","characterName2":"Kathleen Kelly","showName1":"Sleepless in Seattle","showName2":"You\'ve Got Mail","showID1":858,"showID2":9489,"showType1":"movie","showType2":"movie"},{"id":1010,"name":"Michael Badalucco","characterName1":"New York Taxi Dispatcher (as Mike Badalucco)","characterName2":"Charlie","showName1":"Sleepless in Seattle","showName2":"You\'ve Got Mail","showID1":858,"showID2":9489,"showType1":"movie","showType2":"movie"}]';
    }

		let sampleMatches = JSON.parse(sampleData);
    setResults(sampleMatches);

    setInCommonTextTitle(buildInCommonTitleStr());
    setInCommonText(buildInCommonTextStr(sampleMatches.length));
  }

  function buildInCommonTitleStr(): string {
    if (searchType === searchTypes.byActors) {
      return "Shows in common";
      //setInCommonText(buildInCommonText(includeMovies, includeTV));
    } else if (searchType === searchTypes.byShows) {
      return "Actors in common";
    }

    return '';
  }

  function buildInCommonTextStr(count: number): string {
    if (searchType === searchTypes.byActors) {
      if (count > 0) {
        return `These actors appear in at least ${count} show${count > 1 ? 's' : ''} together.`;
      } else if (count === 0) {
        return `These actors have never appeared in a show together.`;
      }
      //setInCommonText(buildInCommonText(includeMovies, includeTV));
    } else if (searchType === searchTypes.byShows) {
      if (count > 0) {
        return `These shows have ${count} actor${count > 1 ? 's' : ''} in common.`;
      } else if (count === 0) {
        return `These shows have no actors in common.`;
      }
    }

    return '';
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

    //console.log(consolidatedTVCredits);
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

    //console.log(showCredits1);
    //console.log(showCredits2);

    // could maybe do this more efficiently than stepping through the second array start to finish for each element in the first array
    showCredits1.forEach((val) => {

      let combinedMatch = {};
      const match = showCredits2.find((res) => {
        if (isMatch(res, val, 'id')) {
          // found the same actor in both lists of shows
          combinedMatch['id'] = val.id;
          combinedMatch['name'] = val.name;
          combinedMatch['characterName1'] = val.character;
          combinedMatch['characterName2'] = res.character;
          combinedMatch['showName1'] = value1?.name;
          combinedMatch['showName2'] = value2?.name;
          combinedMatch['showID1'] = value1?.id; // get show ID from the state
          combinedMatch['showID2'] = value2?.id; 
          combinedMatch['showType1'] = value1?.media_type;
          combinedMatch['showType2'] = value2?.media_type;
          return true;
        }
        return false;
      });

      if (match) {
        //console.log(combinedMatch);
        matches.push(combinedMatch);
      }
    });

    //matches = sortActorsByPopularity(matches);
    
    //console.log(JSON.stringify(matches));
    setResults(matches as []);
    setInCommonTextTitle(buildInCommonTitleStr());
    setInCommonText(buildInCommonTextStr(matches.length ?? 0));
  }

  const submitActorQuery = async () => {
    let matches : any[] = [];

    /* Get the actor credits and find overlaps */
    let actorCredits1: any[] = [];
    let actorCredits2: any[] = [];

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

      let combinedMatch = {};

      if (includeTV && isValidTVCredit(yearCutoff, val)) {
        const match = actorCredits2.find((res) => {
          if (isMatch(res, val, 'name') && isValidTVCredit(yearCutoff, res)) {
            combinedMatch['id'] = val.id; // tv show's id
            combinedMatch['name'] = val.name; // tv shows use 'name'
            combinedMatch['media_type'] = val.media_type;
            combinedMatch['first_air_date'] = val.first_air_date; // tv shows use 'first air date'
            combinedMatch['actorName1'] = value1?.name; // get actor 1's name from state
            combinedMatch['actorName2'] = value2?.name; 
            combinedMatch['actorID1'] = value1?.id; // get actor ID from state
            combinedMatch['actorID2'] = value2?.id; 
            combinedMatch['characterName1'] = val.character;
            combinedMatch['characterName2'] = res.character;
            return true;
          } 
          return false;
        });
        if (match) {
          matches.push(combinedMatch);
        }
      } else if (includeMovies && isValidMovieCredit(yearCutoff, val)) {
        const match = actorCredits2.find((res) => {
          if (isMatch(res, val, 'title')) {
            combinedMatch['id'] = val.id; // movie's id
            combinedMatch['title'] = val.title; // movies use 'title'
            combinedMatch['media_type'] = val.media_type;
            combinedMatch['release_date'] = val.release_date; // movies use 'release date'
            combinedMatch['actorName1'] = value1?.name; // get actor 1's name from state
            combinedMatch['actorName2'] = value2?.name; 
            combinedMatch['actorID1'] = value1?.id; // get actor ID from state
            combinedMatch['actorID2'] = value2?.id; 
            combinedMatch['characterName1'] = val.character;
            combinedMatch['characterName2'] = res.character;
            return true;
          }
          return false;
        });
        if (match) {
          matches.push(combinedMatch);
        }
      }
    });

    matches = sortShowsByReleaseDate(matches);
    //console.log(JSON.stringify(matches));
    setResults(matches as []);

    setInCommonTextTitle(buildInCommonTitleStr());
    setInCommonText(buildInCommonTextStr(matches.length));
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
      if (searchType === searchTypes.byShows) {
        submitShowQuery();
      } else if (searchType === searchTypes.byActors) {
        submitActorQuery();
      }
    }
  }

  return (
    <div>
      <form noValidate onSubmit={ handleSubmit }>
        {/* Instructions */}
        <Box>
        <Grid container spacing={2} direction="column" alignItems="center" justify="center">
          <Grid item xs={12} sm={8} className={"width100"}>

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
              <Grid item xs={12} md={5}>
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
              </Grid>

              <SubmitFormButton buttonText={buttonText} />
              
              <Grid item>
                <Box textAlign="center">
                  <Link variant="body2" onClick={loadTestData}>Load Test Data</Link>
                </Box>
            </Grid>
      
            </Box>

            </Grid>
          </Grid>
          </Box>
      </form>

      <Results inCommonTextTitle={inCommonTextTitle} inCommonText={inCommonText} results={results} searchType={searchType}/>
      
    </div>
  );
}

export default Form;
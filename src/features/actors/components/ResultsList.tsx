import React from 'react';
import ListItem from '@material-ui/core/ListItem';

import { IActorResult } from 'shared/models/actor.model';
import { IMovieResult } from 'shared/models/movie.model';
import { ITVShowResult } from 'shared/models/tvshow.model';

import { searchTypes } from 'shared/enums/enums';

import ShowDetails from './ShowDetails';
import ActorDetails from './ActorDetails';

// define the params here 
interface IResultsList {
    results: Array<IMovieResult & ITVShowResult & IActorResult>; // this array can contain any of these models
    searchType: searchTypes;
}

/* Needs a root node, so <>  </> serves that purpose here */
const ResultsList: React.FC<IResultsList> = ({ results, searchType }) => {
  return (
    <>
      {
        results.map((result: IMovieResult & ITVShowResult & IActorResult, index: number) => {
          // the result can be a movie or a tv show
          // the "&" here sorta combines them into one model, conceptually
          // and it's up to us to pick the right params to display for primary and secondary
          return (
            <ListItem key={index}>
              {searchType === searchTypes.byActors && <ShowDetails
                id={result?.id}
                showName={result?.title ?? result?.name}
                showDate={result?.release_date ?? result?.first_air_date}
                showType={result?.media_type ?? result?.media_type}
                actorName1={result?.actorName1}
                actorName2={result?.actorName2}
                actorID1={result?.actorID1}
                actorID2={result?.actorID2}
                characterName1={result?.characterName1}
                characterName2={result?.characterName2}
              />}

              {searchType === searchTypes.byShows && <ActorDetails 
                id={result?.id}
                name={result?.name}
                showName1={result?.showName1}
                showName2={result?.showName2}
                showID1={result?.showID1}
                showID2={result?.showID2}
                showType1={result?.showType1}
                showType2={result?.showType2}
                characterName1={result?.characterName1}
                characterName2={result?.characterName2}
              />}
            </ListItem>
          )
        })
      } 
    </>
  )
}
  
export default ResultsList;
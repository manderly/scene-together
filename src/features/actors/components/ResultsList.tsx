import React from 'react';
import { IMovieResult } from 'shared/models/movie.model';
import ListItem from '@material-ui/core/ListItem';
import { ITVShowResult } from 'shared/models/tvshow.model';
import ShowDetails from './ShowDetails';
import { Typography } from '@material-ui/core';

// define the params here 
interface IResultsList {
    results: Array<IMovieResult & ITVShowResult>;
}

/* Needs a root node, so <>  </> serves that purpose here */
const ResultsList: React.FC<IResultsList> = ({ results }) => {
  return (
    <>
      {/* Title varies with filters */}
      <Typography variant="h4" color="textSecondary">
        Shows in common
      </Typography>
      {
        results.map((result: IMovieResult & ITVShowResult, index: number) => {
          // the result can be a movie or a tv show
          // the "&" here sorta combines them into one model, conceptually
          // and it's up to us to pick the right params to display for primary and secondary
          return (
            <ListItem key={index}>
              <ShowDetails 
                showName={result?.title ?? result?.name}
                showDate={result?.release_date ?? result?.first_air_date}
                showType={result?.media_type ?? result?.media_type}
              />
            </ListItem>
          )
        })
      } 
    </>
  )
}
  
export default ResultsList;
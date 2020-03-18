import React from 'react';
import { IMovieResult } from 'shared/models/movie.model';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';

// define the params here 
interface IResultsList {
    results: IMovieResult[];
}

/* Needs a root node, so <>  </> serves that purpose here */
const ResultsList: React.FC<IResultsList> = ({ results }) => {
  return (
    <>
      {
        results.map((result: IMovieResult, index: number) => {
          return (
            <ListItem>
              <ListItemText
              key={index}
              primary={result.title}
              secondary={result.release_date}
              />
            </ListItem>
          )
        })
      } 
    </>
  )
}
  
export default ResultsList;
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ResultsList from 'features/actors/components/ResultsList';
import { IMovieResult } from 'shared/models/movie.model';
import { ITVShowResult } from 'shared/models/tvshow.model';

// define the params here 
interface IResultsContainer {
  inCommonText: string;
  results: Array<IMovieResult & ITVShowResult>;
}

const ResultsContainer: React.FC<IResultsContainer> = ({ inCommonText, results }) => {
  return (
    <Grid container spacing={4} alignItems="center">
				{/* Title varies with filters */}
				<Grid item xs={2}></Grid>
				<Grid item xs={8}>
					<Typography variant="h4" color="textSecondary">
						{inCommonText}
					</Typography>
				</Grid>
				<Grid item xs={2}></Grid>

				{/* only show this section once movieResults has data */}
				{results.length &&
						<>
						<Grid item xs={2}></Grid>

						<Grid item xs={8}>
							<ResultsList results={results} />
						</Grid>

						<Grid item xs={2}></Grid>
						</>
				}
			</Grid>
  );
}

export default ResultsContainer;
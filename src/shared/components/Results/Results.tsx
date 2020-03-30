import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ResultsList from 'shared/components/Results/ResultsList/ResultsList';
import { IActorResult } from 'shared/models/actor.model';
import { IMovieResult } from 'shared/models/movie.model';
import { ITVShowResult } from 'shared/models/tvshow.model';

import { searchTypes } from 'shared/enums/enums';

// define the params here 
interface IResults {
	inCommonTextTitle: string;
  inCommonText: string;
	results: Array<IMovieResult & ITVShowResult & IActorResult>;
	searchType: searchTypes;
}

const Results: React.FC<IResults> = ({ inCommonTextTitle, inCommonText, results, searchType }) => {
  return (
    <Grid container spacing={4} alignItems="center" justify="center">
				{/* Title varies with filters */}
				<Grid item xs={2}></Grid>
				<Grid item xs={8}>
					<Typography variant="h4" color="textPrimary" align="center">
						{inCommonTextTitle}
					</Typography>
					<Typography variant="body1" color="textSecondary" align="center">
						{inCommonText}
					</Typography>
				</Grid>
				<Grid item xs={2}></Grid>

				{/* only show this section once movieResults has data */}
				{results.length > 0 &&
						<>
						<Grid item xs={2}></Grid>

						<Grid item xs={8}>
							<ResultsList results={results} searchType={searchType}/>
						</Grid>

						<Grid item xs={2}></Grid>
						</>
				}
			</Grid>
  );
}

export default Results;
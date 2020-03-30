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
				<Grid item sm={12}>
					<Typography variant="h4" color="textPrimary" align="center">
						{inCommonTextTitle}
					</Typography>
					<Typography variant="body1" color="textSecondary" align="center">
						{inCommonText}
					</Typography>
				</Grid>

				{/* only show this section once movieResults has data */}
				{results.length > 0 &&
						<Grid item xs={12} sm={10} md={8} lg={6}>
							<ResultsList results={results} searchType={searchType}/>
						</Grid>
				}
			</Grid>
  );
}

export default Results;
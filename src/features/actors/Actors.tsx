import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
    },
  }),
);

const Actors: React.FC = () => {  // functional component 
	const classes = useStyles();

  return (
		<div>
			{/*  Left field */}
			<form className={classes.root} noValidate autoComplete="off">
				<Grid container md={8} spacing={6} alignItems="center">
					<Grid item xs={12} alignItems="center">
						<TextField 
							id="form-field-1" 
							variant="filled"
							fullWidth
							label="Actor" 
							color="secondary" 
							placeholder="Actor name"/>
					</Grid>

				{/* Right field */}
					<Grid item xs={12}>
						<TextField 
							id="form-field-2"
							variant="filled" 
							fullWidth 
							label="Another actor name" 
							color="secondary" 
							placeholder="Another actor name"/>
					</Grid>
				</Grid>

				<Button variant="contained" color="primary">Find actors in common!</Button> 
			</form>
		</div>
	);
}

export default Actors;
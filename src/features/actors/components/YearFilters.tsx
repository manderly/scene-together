import React from 'react';
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      },
		},
		formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

// define the params here 
interface ISearchFilters {
    yearCutoff: string;
    handleChange: (value: any) => void;
}

/* Needs a root node, so <>  </> serves that purpose here */
const YearFilters: React.FC<ISearchFilters> = ({ yearCutoff, handleChange }) => {
    const classes = useStyles();

    return (
    <>
    <InputLabel id="yearCutoff-select-label">
      Only include shows from the past...
    </InputLabel>

    <FormControl variant="outlined" style={{minWidth: 260}}>
        <Select
            labelId="yearCutoff-select-label"
            id="yearCutoff-select"
            value={yearCutoff}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <option value="">All years</option>
            <option value={5}>5 years</option>
            <option value={15}>15 years</option>
            <option value={30}>30 years</option>
        </Select>
    </FormControl>
    <br/><br/>
    </>
    )
}

export default YearFilters;
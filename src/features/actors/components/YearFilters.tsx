import React from 'react';
import { Typography, Select } from '@material-ui/core';
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
    <InputLabel shrink id="yearCutoff-select-label">
      Only include shows from the past...
    </InputLabel>

    <FormControl style={{minWidth: 220, marginRight: 50}}>
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
    </>
    )
}

export default YearFilters;
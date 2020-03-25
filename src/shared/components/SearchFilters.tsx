import React from 'react';
import { Typography } from '@material-ui/core';
import MediaTypeCheckbox from 'shared/components/MediaTypeCheckbox';
import YearFilters from 'features/actors/components/YearFilters';

// define the params here 
interface ISearchFilters {
  yearCutoff: string;
  handleYearCutoffChange: (event: any) => void; //(event: React.ChangeEvent<{ value: unknown }>
  tvChecked: boolean;
  handleTVCheckedChange: (value: boolean) => void;
  moviesChecked: boolean;
  handleMoviesCheckedChange: (value: boolean) => void;
}

const SearchFilters: React.FC<ISearchFilters> = ({ yearCutoff, handleYearCutoffChange, tvChecked, handleTVCheckedChange, moviesChecked, handleMoviesCheckedChange }) => {
  return (
    <>
      <Typography variant="h6" color="textPrimary">Optional search filters</Typography>
      <br/>
      <YearFilters yearCutoff={yearCutoff} handleChange={handleYearCutoffChange}/>

      <MediaTypeCheckbox checked={tvChecked} onChange={handleTVCheckedChange} label="Include TV shows" />
      <MediaTypeCheckbox checked={moviesChecked} onChange={handleMoviesCheckedChange} label="Include movies" />
    </>
  );
}

export default SearchFilters;
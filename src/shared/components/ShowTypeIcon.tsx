import React from 'react';
import TvSharpIcon from '@material-ui/icons/TvSharp';
import MovieSharpIcon from '@material-ui/icons/MovieSharp';

// define the params here 
interface IShowTypeIcon {
  showType: string;
}

const ShowTypeIcon: React.FC<IShowTypeIcon> = ({ showType }) => {
  return (
    showType === "movie" ? <MovieSharpIcon /> : <TvSharpIcon />
  )
}

export default ShowTypeIcon;
/* Utility functions shared by both Actors and Shows pages */

import { IMovie } from "shared/models/movie.model";
import { ITVShow } from "shared/models/tvshow.model";

export const buildInCommonText = (includeMovies: boolean, includeTV: boolean) => {
  let showTypesStr = '';
  if (includeMovies && includeTV) {
    showTypesStr = 'Movies and TV shows';
  } else if (includeMovies && !includeTV) {
    showTypesStr = "Movies";
  } else if (!includeMovies && includeTV) {
    showTypesStr = "TV shows";
  } else {
    showTypesStr = "Nothing";
  }

  showTypesStr += " in common";

  return showTypesStr;
}

export const sortShowsByReleaseDate = (matches: Array<IMovie & ITVShow>) => {
  return matches.sort((a: IMovie & ITVShow, b: IMovie & ITVShow) => (
    a['release_date'] > b['release_date'] || a['first_air_date'] > b['first_air_date']) ? -1: 1);
}

export const sortShowsByPopularity = (matches: Array<IMovie & ITVShow>) => {
  return matches.sort((a: IMovie & ITVShow, b: IMovie & ITVShow) => (
    a['popularity'] > b['popularity']) ? -1: 1);
}
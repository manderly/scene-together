import { getAPI } from "./api";
import { IMovie } from 'shared/models/movie.model';
import { ITVShow } from 'shared/models/tvshow.model';

// "multi" searches for both TV shows and movies with names that match the query string
// this call is used for populating the auto-complete select so the user can pick from the list of matches

// todo: should be called "findShowsByName"
export const findShowByName = async (name: string = ''): Promise<IMovie & ITVShow> => {
  const params = {
    'query': name,
    'include_adult': false
  };
  const result = await getAPI('3/search/multi', params);
  return result.data;
}

export const getTVShowCredits = async (id: number): Promise<[]> => {
  const params = {
    'append_to_response': 'credits',
  };
  const result = await getAPI(`3/tv/${id}`, params);
  return result.data.credits.cast;
}
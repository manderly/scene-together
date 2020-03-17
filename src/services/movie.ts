import { getAPI } from "./api"
import { IMovie } from 'shared/models/movie.model';

export const findMoviesInCommon = async (actorIDs: number[] = []): Promise<IMovie> => {
    const params = {
        'with_people':actorIDs.join(','),
        'sort_by':'vote_average.desc'
    };
    const result = await getAPI('3/discover/movie', params);
    return result.data;
}

import { getAPI } from "./api"

export const findMovie = async (actorIDs: number[] = []) => {
    const params = {
        'with_people':actorIDs.join(','),
        'sort_by':'vote_average.desc'
    };
    const result = await getAPI('3/discover/movie', params);
    return result.data;
}

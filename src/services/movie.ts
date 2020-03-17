import { getAPI } from "./api"

export const findMovie = async () => {
    const result = await getAPI('3/discover/movie?with_people=287,819&sort_by=vote_average.desc');
    return result.data;
}

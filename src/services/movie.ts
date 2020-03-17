import { getAPI } from "./api"

export const findMovie = async () => {
    const result = await getAPI('3/movie/550');
    return result.data;
}

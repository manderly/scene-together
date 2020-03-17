import Axios from 'axios';

export const getAPI = (url: string) => {
  return Axios.get(`https://api.themoviedb.org/${url}&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)
}

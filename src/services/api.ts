import Axios from 'axios';

export const getAPI = (url: string, params?: any) => {
    const config = {
        params:  {
            'api_key': process.env.REACT_APP_API_KEY_TMDB,
            ...params
        }
    };
  
    return Axios.get(`https://api.themoviedb.org/${url}`, config)
}

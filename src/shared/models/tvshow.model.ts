export interface ITVShow {
  page: number;
  total_results: number;
  total_pages: number;
  results: ITVShowResult[];
} 

export interface ITVShowResult {
  name: string;
  first_air_date: number;
  episode_count: number;
  vote_average: number;
  media_type: string;
  actorName1: string;
  actorName2: string;
  characterName1: string;
  characterName2: string;
}

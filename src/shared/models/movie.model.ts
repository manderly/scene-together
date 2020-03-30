export interface IMovie {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovieResult[];
} 

export interface IMovieResult {
    title: string;
    release_date: number;
    vote_average: number;
    media_type: string;
    actorName1: string;
    actorName2: string;
    actorID1: number;
    actorID2: number;
    characterName1: string;
    characterName2: string;
}

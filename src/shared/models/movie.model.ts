export interface IMovie {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovieResult[];
} 

export interface IMovieResult {
    title: string;
    release_date: number;
}
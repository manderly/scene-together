export interface IActor {
    page: number;
    total_results: number;
    total_pages: number;
    results: IActorResult[];
}

export interface IActorResult {
    id: number;
    name: string;
    release_date: number;
    vote_average: number;
}
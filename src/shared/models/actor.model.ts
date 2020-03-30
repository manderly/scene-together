export interface IActor {
    page: number;
    total_results: number;
    total_pages: number;
    results: IActorResult[];
}

export interface IActorResult {
    id: number;
    name: string;
    characterName1: string;
    characterName2: string;
    showName1: string;
    showName2: string;
    showID1: number;
    showID2: number;
    showType1: string;
    showType2: string;
}

export interface IActorCredits {
    credits: [];
}
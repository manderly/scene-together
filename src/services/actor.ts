import { getAPI } from "./api"
import { IActor } from 'shared/models/actor.model';

export const findActorByName = async (name: string = ''): Promise<IActor> => {
    const params = {
        'query':name,
        'include_adult':false
    };
    const result = await getAPI('3/search/person', params);
    return result.data;
}
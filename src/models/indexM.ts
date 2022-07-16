import {MTP_TYPES} from "../constants/constants";

export interface IActorCard {
    src:string,
    name:string,
    className?:string
}

export interface IGenresFilter {
    setRef: any,
    isResetFilter:boolean,
    type: MTP_TYPES
}

export interface IMovieTvItem {
    [key: string]: MTP_TYPES
}

export interface ISearchCurrent {
    type: MTP_TYPES,
    text?: string
}
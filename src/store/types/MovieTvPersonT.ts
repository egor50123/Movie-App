import {
    IMoviePayload, IMoviesTvsPayload,
    IPeoplePayload,
    ISimilarMoviesPayload,
    ITvPayload
} from "../../models/payloadAPI_M";

export type itemType = "movie" | "tv"

export interface MovieTvPerson {
    tv?: {
        payload:ITvPayload
    },
    movie?: {
        payload:IMoviePayload
    }
    payload: IMoviePayload | ITvPayload | null,
    type: string | null
    isLoading: boolean,
    error: null | string,

    people: {
        isLoading: boolean,
        error: null | string,
        payload: IPeoplePayload | null,
    }

    similar: {
        isLoading: boolean,
        error: null | string,
        payload: IMoviesTvsPayload | null,
    }
}


export enum MovieTvPersonActionTypes {
    FETCH_ITEM = "FETCH_ITEM",
    FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS",
    FETCH_ITEM_ERROR = "FETCH_ITEM_ERROR",
    FETCH_PEOPLE = "FETCH_PEOPLE",
    FETCH_PEOPLE_SUCCESS = "FETCH_PEOPLE_SUCCESS",
    FETCH_PEOPLE_ERROR = "FETCH_PEOPLE_ERROR",
    CLEAR_ITEM = "CLEAR_ITEM",
    FETCH_SIMILAR = "FETCH_SIMILAR",
    FETCH_SIMILAR_SUCCESS = "FETCH_SIMILAR_SUCCESS",
    FETCH_SIMILAR_ERROR = "FETCH_SIMILAR_ERROR",
}

interface FetchSimilarAction {
    type: MovieTvPersonActionTypes.FETCH_SIMILAR
}

interface FetchSimilarSuccessAction {
    type: MovieTvPersonActionTypes.FETCH_SIMILAR_SUCCESS
    payload: IMoviesTvsPayload | null
}

interface FetchSimilarErrorAction {
    type: MovieTvPersonActionTypes.FETCH_SIMILAR_ERROR,
    error: string
}


interface FetchMovieTvPersonAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM,
    itemType:itemType
}

interface FetchMovieTvPersonSuccessAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS,
    payload:IMoviePayload | ITvPayload,
}

interface FetchMovieTvPersonErrorAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM_ERROR,
    error: string,
}

interface FetchPeopleAction {
    type: MovieTvPersonActionTypes.FETCH_PEOPLE
}

interface FetchPeopleSuccessAction {
    type: MovieTvPersonActionTypes.FETCH_PEOPLE_SUCCESS
    payload:IPeoplePayload | null
}

interface FetchPeopleErrorAction {
    type:MovieTvPersonActionTypes.FETCH_PEOPLE_ERROR
    error:string
}

interface ClearItemAction {
    type:MovieTvPersonActionTypes.CLEAR_ITEM
}



export type MovieTvPersonAction = FetchMovieTvPersonAction |
    FetchMovieTvPersonSuccessAction |
    FetchMovieTvPersonErrorAction |
    ClearItemAction |
    FetchPeopleAction |
    FetchPeopleSuccessAction |
    FetchPeopleErrorAction |
    FetchSimilarAction |
    FetchSimilarSuccessAction |
    FetchSimilarErrorAction
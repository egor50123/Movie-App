import {IMovieTvPersonPayload, IPeoplePayload, ISimilarMoviesPayload} from "../../models/payloadAPI_M";

export interface MovieTvPerson {
    payload: IMovieTvPersonPayload,
    isLoading: boolean,
    error: null | string
    isLoadingPeople: boolean,
    errorPeople:null | string,
    people: IPeoplePayload | null,
    isLoadingSimilar: boolean,
    errorSimilar:null | string,
    similarMovie: ISimilarMoviesPayload | null
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
    similar: ISimilarMoviesPayload | null
}

interface FetchSimilarErrorAction {
    type: MovieTvPersonActionTypes.FETCH_SIMILAR_ERROR,
    errorSimilar: string
}


interface FetchMovieTvPersonAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM,
}

interface FetchMovieTvPersonSuccessAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS,
    payload:IMovieTvPersonPayload
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
    people:IPeoplePayload | null
}

interface FetchPeopleErrorAction {
    type:MovieTvPersonActionTypes.FETCH_PEOPLE_ERROR
    errorPeople:string
}

interface ClearItemAction {
    type:MovieTvPersonActionTypes.CLEAR_ITEM
}



export type MovieTvPersonAction = FetchMovieTvPersonAction | FetchMovieTvPersonSuccessAction | FetchMovieTvPersonErrorAction | ClearItemAction | FetchPeopleAction |
    FetchPeopleSuccessAction | FetchPeopleErrorAction | FetchSimilarAction | FetchSimilarSuccessAction | FetchSimilarErrorAction
import {IMovieTvPerson, IPeople} from "../API/indexAPI";

export interface MovieTvPerson {
    payload: IMovieTvPerson,
    isLoading: boolean,
    error: null | string
    isLoadingPeople: boolean,
    errorPeople:null | string,
    people: IPeople | null
}

export enum MovieTvPersonActionTypes {
    FETCH_ITEM = "FETCH_ITEM",
    FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS",
    FETCH_ITEM_ERROR = "FETCH_ITEM_ERROR",
    FETCH_PEOPLE = "FETCH_PEOPLE",
    FETCH_PEOPLE_SUCCESS = "FETCH_PEOPLE_SUCCESS",
    FETCH_PEOPLE_ERROR = "FETCH_PEOPLE_ERROR",
    CLEAR_ITEM = "CLEAR_ITEM"
}

interface FetchMovieTvPersonAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM,
}

interface FetchMovieTvPersonSuccessAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS,
    payload:IMovieTvPerson
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
    people:IPeople | null
}

interface FetchPeopleErrorAction {
    type:MovieTvPersonActionTypes.FETCH_PEOPLE_ERROR
    errorPeople:string
}

interface ClearItemAction {
    type:MovieTvPersonActionTypes.CLEAR_ITEM
}



export type MovieTvPersonAction = FetchMovieTvPersonAction | FetchMovieTvPersonSuccessAction | FetchMovieTvPersonErrorAction | ClearItemAction | FetchPeopleAction |
    FetchPeopleSuccessAction | FetchPeopleErrorAction
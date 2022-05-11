import {ISearchPayload} from "../../models/payloadAPI_M";

export interface SearchState {
    payload: ISearchPayload | null,
    isLoading: boolean,
    error: null | string
}

export enum FilmActionTypes {
    FETCH_FILMS = "FETCH_FILMS",
    FETCH_FILMS_SUCCESS = "FETCH_FILMS_SUCCESS",
    FETCH_FILMS_ERROR = "FETCH_FILMS_ERROR",
    CLEAR_SEARCH = "CLEAR_SEARCH"
}

interface FetchFilmAction {
    type: FilmActionTypes.FETCH_FILMS,
}

interface FetchFilmSuccessAction {
    type: FilmActionTypes.FETCH_FILMS_SUCCESS,
    payload: ISearchPayload,
}

interface FetchFilmErrorAction {
    type: FilmActionTypes.FETCH_FILMS_ERROR,
    payload: string,
}

interface ClearSearchAction {
    type: FilmActionTypes.CLEAR_SEARCH
}

export type FilmAction = FetchFilmAction | FetchFilmSuccessAction | FetchFilmErrorAction | ClearSearchAction
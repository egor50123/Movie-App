import {ISearchPayload} from "../../models/payloadAPI_M";

export interface SearchState {
    payload: ISearchPayload | null,
    isLoading: boolean,
    error: null | string
    text:string
}

export enum SearchActionTypes {
    FETCH_SEARCH = "FETCH_SEARCH",
    FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS",
    FETCH_SEARCH_ERROR = "FETCH_SEARCH_ERROR",
    CLEAR_SEARCH = "CLEAR_SEARCH"
}

interface FetchSearchAction {
    type: SearchActionTypes.FETCH_SEARCH,
}

interface FetchSearchSuccessAction {
    type: SearchActionTypes.FETCH_SEARCH_SUCCESS,
    payload: ISearchPayload,
    text:string,
}

interface FetchSearchErrorAction {
    type: SearchActionTypes.FETCH_SEARCH_ERROR,
    payload: string,
}

interface ClearSearchAction {
    type: SearchActionTypes.CLEAR_SEARCH
}

export type SearchAction = FetchSearchAction | FetchSearchSuccessAction | FetchSearchErrorAction | ClearSearchAction
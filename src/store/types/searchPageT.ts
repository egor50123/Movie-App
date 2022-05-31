import {
    ISearchCollectionsPayload,
    ISearchMoviePayload,
    ISearchPagePayload, ISearchPagePayloadTypes,
    ISearchPersonPayload,
    ISearchTvPayload
} from "../../models/payloadAPI_M";
import {MTP, MTP_TYPES} from "../../constants/constants";

export interface SearchPageState {
    movie: {
        payload: ISearchPagePayload<ISearchMoviePayload> | null
        isLoading: boolean,
        error: boolean
    }
    tv: {
        payload: ISearchPagePayload<ISearchTvPayload> | null,
        isLoading: boolean,
        error: boolean
    }
    person: {
        payload: ISearchPagePayload<ISearchPersonPayload> | null,
        isLoading: boolean,
        error: boolean
    }
    collections: {
        payload: ISearchPagePayload<ISearchCollectionsPayload> | null,
        isLoading: boolean,
        error: boolean
    }
    text:string
}

export enum SearchPageActionTypes {
    FETCH_SEARCH = "FETCH_SEARCH",
    FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS",
    FETCH_ITEM_ERROR = "FETCH_ITEM_ERROR",
    CLEAR_SEARCH_PAGE = "CLEAR_SEARCH_PAGE"
}

interface FetchSearchAction {
    type: SearchPageActionTypes.FETCH_SEARCH,
}


interface SuccessAction  {
    type: SearchPageActionTypes.FETCH_ITEM_SUCCESS,
    payload: ISearchPagePayload<ISearchPagePayloadTypes>,
    text:string,
    currentType: MTP_TYPES
}

interface ErrorAction {
    type: SearchPageActionTypes.FETCH_ITEM_ERROR,
    payload: boolean,
    currentType: MTP_TYPES
}


interface ClearSearchAction {
    type: SearchPageActionTypes.CLEAR_SEARCH_PAGE
}

export type SearchPageActions = FetchSearchAction | SuccessAction  | ErrorAction | ClearSearchAction

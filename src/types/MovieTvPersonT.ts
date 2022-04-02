export interface MovieTvPerson {
    title: string,
    description: string,
    isLoading: boolean,
    error: null | string
}

export enum MovieTvPersonActionTypes {
    FETCH_ITEM = "FETCH_ITEM",
    FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS",
    FETCH_ITEM_ERROR = "FETCH_ITEM_ERROR",
}

interface FetchMovieTvPersonAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM,
}

interface FetchMovieTvPersonSuccessAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS,
    title: string,
    description: string
}

interface FetchMovieTvPersonErrorAction {
    type: MovieTvPersonActionTypes.FETCH_ITEM_ERROR,
    payload: string,
}

export type MovieTvPersonAction = FetchMovieTvPersonAction | FetchMovieTvPersonSuccessAction | FetchMovieTvPersonErrorAction
export interface posterState {
    isLoading: boolean,
    error: null | string,
    payload: string[],
}

export enum PosterActionTypes {
    FETCH_POSTER = "FETCH_POSTER",
    FETCH_POSTER_SUCCESS = "FETCH_POSTER_SUCCESS",
    FETCH_POSTER_ERROR = "FETCH_POSTER_ERROR",
}

interface FetchPosterAction {
    type: PosterActionTypes.FETCH_POSTER,
}

interface FetchPosterSuccessAction {
    type: PosterActionTypes.FETCH_POSTER_SUCCESS,
    payload: string[],
}

interface FetchPosterErrorAction {
    type: PosterActionTypes.FETCH_POSTER_ERROR,
    error: string,
}



export type PosterAction = FetchPosterAction | FetchPosterSuccessAction | FetchPosterErrorAction
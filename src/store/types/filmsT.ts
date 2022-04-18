export interface MovieState {
    films: any[],
    text?: string,
    isLoading: boolean,
    error: null | string
}

export enum MovieActionTypes {
    FETCH_MOVIE = "FETCH_MOVIE",
    FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS",
    FETCH_MOVIE_ERROR = "FETCH_MOVIE_ERROR",
}

interface FetchMovieAction {
    type: MovieActionTypes.FETCH_MOVIE,
}

interface FetchMovieSuccessAction {
    type: MovieActionTypes.FETCH_MOVIE_SUCCESS,
    payload: any[],
}

interface FetchMovieErrorAction {
    type: MovieActionTypes.FETCH_MOVIE_ERROR,
    payload: string,
}



export type MovieAction = FetchMovieAction | FetchMovieSuccessAction | FetchMovieErrorAction
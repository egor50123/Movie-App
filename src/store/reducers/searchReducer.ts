import {FilmAction, FilmActionTypes, SearchState} from "../types/searchT";

const init: SearchState = {
    payload: null,
    isLoading: false,
    error: null
}

export const searchReducer = (state = init,action:FilmAction):SearchState => {
    switch (action.type) {
        case FilmActionTypes.FETCH_FILMS:
            return {...state,isLoading:true,error:null}
        case FilmActionTypes.FETCH_FILMS_SUCCESS:
            return {...state,isLoading:false,error:null,payload:action.payload}
        case FilmActionTypes.FETCH_FILMS_ERROR:
            return {...state,isLoading:false,error:action.payload}
        case FilmActionTypes.CLEAR_SEARCH:
            return {...state,payload:null}
        default: return state
    }
}
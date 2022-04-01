import {FilmAction, FilmActionTypes, SearchState} from "../../types/searchT";

const init: SearchState = {
    films: [],
    isLoading: false,
    error: null
}

export const searchReducer = (state = init,action:FilmAction):SearchState => {
    switch (action.type) {
        case FilmActionTypes.FETCH_FILMS:
            return {isLoading:true,error:null,films:[]}
        case FilmActionTypes.FETCH_FILMS_SUCCESS:
            return {isLoading:false,error:null,films:action.payload}
        case FilmActionTypes.FETCH_FILMS_ERROR:
            return {isLoading:false,error:action.payload,films:[]}
        case FilmActionTypes.CLEAR_SEARCH:
            return {...state,films:[]}
        default: return state
    }
}
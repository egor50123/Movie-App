import {MovieTvPerson, MovieTvPersonAction, MovieTvPersonActionTypes} from "../types/MovieTvPersonT";


const init: MovieTvPerson = {
    payload: null,
    isLoading: false,
    error: null,
    type: null,

    people: {
        payload: null,
        isLoading: false,
        error: null,
    },
    similar: {
        payload: null,
        isLoading: false,
        error: null,
    }
}

export const movieTvPersonReducer = (state = init, action: MovieTvPersonAction): MovieTvPerson => {
    switch (action.type) {
        case MovieTvPersonActionTypes.FETCH_ITEM:
            return {...state, isLoading: true, type: action.itemType}
        case MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS:
            return {...state, isLoading: false, error: null, payload: action.payload}
        case MovieTvPersonActionTypes.FETCH_ITEM_ERROR:
            return {...state, isLoading: false, error: "error"}
        case MovieTvPersonActionTypes.CLEAR_ITEM:
            return {...init}
        case MovieTvPersonActionTypes.FETCH_PEOPLE:
            return {
                ...state,
                people: {
                    ...state.people,
                    isLoading: true,
                }
            }
        case MovieTvPersonActionTypes.FETCH_PEOPLE_SUCCESS:
            return {
                ...state,
                people: {
                    ...state.people,
                    isLoading: false,
                    payload: action.payload
                }
            }
        case MovieTvPersonActionTypes.FETCH_PEOPLE_ERROR:
            return {
                ...state,
                people: {
                    ...state.people,
                    isLoading: false,
                    error: action.error
                }
            }
        case MovieTvPersonActionTypes.FETCH_SIMILAR:
            return {
                ...state,
                similar: {
                    ...state.similar,
                    isLoading: true
                }
            }
        case MovieTvPersonActionTypes.FETCH_SIMILAR_SUCCESS:
            return {
                ...state,
                similar: {
                    ...state.similar,
                    isLoading: false,
                    payload: action.payload,
                }
            }
        case MovieTvPersonActionTypes.FETCH_SIMILAR_ERROR:
            return {
                ...state,
                similar: {
                    ...state.similar,
                    isLoading: false,
                    error: action.error,
                }
            }
        default:
            return state
    }
}
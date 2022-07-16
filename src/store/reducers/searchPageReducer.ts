import {SearchPageActions, SearchPageActionTypes, SearchPageState} from "../types/searchPageT";

const init: SearchPageState = {
    movie: {
        payload: null,
        isLoading: false,
        error: false
    },
    tv: {
        payload: null,
        isLoading: false,
        error: false
    },
    person: {
        payload: null,
        isLoading: false,
        error: false
    },
    collections: {
        payload: null,
        isLoading: false,
        error: false
    },
    text:""
}

export const searchPageReducer = (state = init,action:SearchPageActions):SearchPageState => {
    switch (action.type) {
        case SearchPageActionTypes.FETCH_SEARCH_ITEMS_SUCCESS :
            return {
                ...state,
                [action.currentType]: {
                    payload: action.payload,
                    error: false,
                    isLoading: false
                },
            }
        case SearchPageActionTypes.FETCH_SEARCH_ITEMS_ERROR:
            return {
                ...state,
                [action.currentType]: {
                    error:true,
                    isLoading: false
                }
            }

        case SearchPageActionTypes.CLEAR_SEARCH_PAGE:
            return {
                ...init
            }
        default: return state
    }
}
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
        case SearchPageActionTypes.FETCH_ITEM_SUCCESS :
            return {
                ...state,
                [action.currentType]: {
                    payload: action.payload,
                    error: false,
                    isLoading: false
                },
            }
        case SearchPageActionTypes.FETCH_ITEM_ERROR:
            return {
                ...state,
                [action.currentType]: {
                    error:true,
                    isLoading: false
                }
            }
        default: return state
    }
}
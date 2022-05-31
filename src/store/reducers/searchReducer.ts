import {SearchAction, SearchActionTypes, SearchState} from "../types/searchT";

const init: SearchState = {
    payload: null,
    isLoading: false,
    error: false,
    text: ""
}

export const searchReducer = (state = init,action:SearchAction):SearchState => {
    switch (action.type) {
        case SearchActionTypes.FETCH_SEARCH:
            return {...state,isLoading:true, error:false}
        case SearchActionTypes.FETCH_SEARCH_SUCCESS:
            return {...state,isLoading:false,payload:action.payload, text:action.text, error:false}
        case SearchActionTypes.FETCH_SEARCH_ERROR:
            return {...state,isLoading:false,error:action.payload, payload: null}
        case SearchActionTypes.CLEAR_SEARCH:
            return {...state,payload:null}
        default: return state
    }
}
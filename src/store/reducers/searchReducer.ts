import {SearchAction, SearchActionTypes, SearchState} from "../types/searchT";

const init: SearchState = {
    payload: null,
    isLoading: false,
    error: null,
    text: ""
}

export const searchReducer = (state = init,action:SearchAction):SearchState => {
    switch (action.type) {
        case SearchActionTypes.FETCH_SEARCH:
            return {...state,isLoading:true,error:null}
        case SearchActionTypes.FETCH_SEARCH_SUCCESS:
            return {...state,isLoading:false,error:null,payload:action.payload, text:action.text}
        case SearchActionTypes.FETCH_SEARCH_ERROR:
            return {...state,isLoading:false,error:action.payload}
        case SearchActionTypes.CLEAR_SEARCH:
            return {...state,payload:null}
        default: return state
    }
}
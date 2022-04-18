import {PosterAction, PosterActionTypes, posterState} from "../types/posterT";

const init: posterState = {
    isLoading:false,
    error:null,
    payload: []
}

export const posterReducer = (state = init, action: PosterAction): posterState => {
    switch (action.type) {
        case PosterActionTypes.FETCH_POSTER:
            return {
                ...state,
                isLoading:true,
                error:null,
            }
        case PosterActionTypes.FETCH_POSTER_SUCCESS:
            return {
                isLoading:false,
                error:null,
                payload: action.payload
            }
        case PosterActionTypes.FETCH_POSTER_ERROR:
            return {
                isLoading:false,
                error:action.error,
                payload: []
            }
        default:
            return state
    }
}
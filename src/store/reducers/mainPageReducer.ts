import {MainPageActions, MainPageActionTypes, MainPageState} from "../types/mainPageT";

const init = {
    switchType: {},
    genres: {
        isLoading:false,
        error:null,
        payload: null,
    }
}

export const mainPageReducer = (state = init, action:MainPageActions):MainPageState => {
    switch (action.type) {
        case MainPageActionTypes.SET_SWITCH:
            return {
                ...state,
                switchType: {
                    ...state.switchType,
                    [action.currentSwitch]: action.id
                },
            }
        case MainPageActionTypes.FETCH_GENRES:
            return {
                ...state,
                genres: {
                    ...state.genres,
                    isLoading:true
                }
            }
        case MainPageActionTypes.FETCH_GENRES_SUCCESS:
            return {
                ...state,
                genres: {
                    ...state.genres,
                    isLoading: false,
                    payload:action.payload
                }
            }
        case MainPageActionTypes.FETCH_GENRES_ERROR:
            return {
                ...state,
                genres: {
                    ...state.genres,
                    isLoading:false,
                    error:action.error
                }
            }
        default: return state
    }
}
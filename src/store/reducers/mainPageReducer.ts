import {genreTypes, MainPageActions, MainPageActionTypes, MainPageState} from "../types/mainPageT";

const init:MainPageState = {
    switchType: {},
    [genreTypes.genresMovie]: {
        isLoading:false,
        error:null,
        payload: null,
    },
    [genreTypes.genresTv]: {
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
                [action.typeGenre]: {
                    ...state[action.typeGenre],
                    isLoading:true
                }
            }
        case MainPageActionTypes.FETCH_GENRES_SUCCESS:
            return {
                ...state,
                [action.typeGenre]: {
                    ...state[action.typeGenre],
                    isLoading: false,
                    payload:action.payload
                }
            }
        case MainPageActionTypes.FETCH_GENRES_ERROR:
            return {
                ...state,
                [action.typeGenre]: {
                    ...state[action.typeGenre],
                    isLoading:false,
                    error:action.error
                }
            }
        default: return state
    }
}
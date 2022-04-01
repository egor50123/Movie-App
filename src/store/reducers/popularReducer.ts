import {UserAction, UserActionTypes, UserState} from "../../types/filmsT";


const init: UserState = {
    films: [],
    text: '',
    isLoading: false,
    error: null
}

export const popularReducer = (state = init,action:UserAction):UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {isLoading:true,error:null,films:[]}
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {isLoading:false,error:null,films:action.payload}
        case UserActionTypes.FETCH_USER_ERROR:
            return {isLoading:false,error:action.payload,films:[]}
        default: return state
    }
}
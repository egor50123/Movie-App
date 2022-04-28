import {authActionCreators, authActions, authState} from "../types/authT";

const init: authState = {
    isLoading:false,
    error:null,
    payload: null,
    session: {
        isLoading: false,
        error:null,
        payload:null,
    }

}

export const authReducer = (state = init, action: authActions): authState => {
    switch (action.type) {
        case authActionCreators.FETCH_TOKEN:
            return {...state,isLoading:true}
        case authActionCreators.FETCH_TOKEN_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case authActionCreators.FETCH_TOKEN_ERROR:
            return {...state,isLoading:false,error:action.error}
        case authActionCreators.CREATE_SESSION:
            return {
                ...state,
                session: {
                    ...state.session,
                    isLoading:true
                }
            }
        case authActionCreators.CREATE_SESSION_SUCCESS:
            return {
                ...state,
                session: {
                    ...state.session,
                    payload: action.payload,
                    isLoading: false,
                }
            }
        case authActionCreators.SET_TOKEN_LOCAL:
            return {
                ...state,
                payload: {
                    request_token: action.token,
                    success:true
                }
            }
        case authActionCreators.CREATE_SESSION_ERROR:
            return {
                ...state,
                session: {
                    ...state.session,
                    error:action.error,
                    isLoading: false,
                }
            }

        case authActionCreators.DELETE_SESSION:
            return {
                ...state,
                payload: null,
                session: {
                    payload:null,
                    error:null,
                    isLoading: false,
                }
            }
        default:
            return state
    }
}
import {accountActionCreators, accountActions, accountState} from "../types/accountT";

const init:accountState = {
    error: null,
    details: {
        payload: null,
    },
    list: {
        payload: null,
        isLoading:false,
    },
    myList: {
        payload:null,
        isLoading: false,
    },
    snackbars: {
        isOpen: false,
        message: ""
    },
    createdList: {
        isLoading: false,
        payload: null,
    }
}

export const accountReducer = (state = init, action:accountActions ):accountState  => {
    switch (action.type) {
        case accountActionCreators.FETCH_ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    payload:action.payload
                }
            }

        case accountActionCreators.FETCH_ACCOUNT_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading:true
                }
            }
        case accountActionCreators.FETCH_ACCOUNT_LIST_SUCCESS:
            return {
                ...state,
                list:{
                    payload:action.payload,
                    isLoading:false
                }
            }
        case accountActionCreators.FETCH_ACCOUNT_MY_LIST:
            return {
                ...state,
                myList: {
                    ...state.myList,
                    isLoading:true
                }
            }
        case accountActionCreators.FETCH_ACCOUNT_MY_LIST_SUCCESS:
            return {
                ...state,
                myList:{
                    payload:action.payload,
                    isLoading:false
                }
            }
        case accountActionCreators.FETCH_ERROR:
            return {...state,error:action.error}

        case accountActionCreators.CLEAR_LISTS:
            return {
                ...state,
                list: {
                    ...state.list,
                    payload:null,
                },
                myList: {
                    ...state.myList,
                    payload:null,
                },
            }
        case accountActionCreators.SET_SNACKBARS:
            return {
                ...state,
                snackbars: {
                    isOpen: action.isOpen,
                    message: action.message
                }
            }
        case accountActionCreators.FETCH_CREATED_LIST:
            return {
                ...state,
                createdList: {
                    ...state.createdList,
                    isLoading: true
                }
            }
        case accountActionCreators.FETCH_CREATED_LIST_SUCCESS:
            return {
                ...state,
                createdList: {
                    ...state.createdList,
                    isLoading: false,
                    payload: action.payload
                }
            }
        default: return state
    }
}
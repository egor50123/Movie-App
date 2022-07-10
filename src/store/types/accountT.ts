import {
    IAccountCreatedListPayload,
    IAccountMyLists,
    IAccountPayload,
    IMoviesTvsPayload
} from "../../models/payloadAPI_M";

export interface accountState {
    error:string | null,
    details: {
        payload: IAccountPayload | null,
    }
    list: {
        isLoading: boolean
        payload:IMoviesTvsPayload | null
    }
    myList: {
        isLoading: boolean,
        payload:IAccountMyLists | null
    },
    snackbars: {
        isOpen: boolean,
        message:string
    }
    createdList: {
        isLoading: boolean,
        payload: IAccountCreatedListPayload | null
    }
}

export enum accountActionCreators {
    FETCH_ACCOUNT_DETAILS_SUCCESS = "FETCH_ACCOUNT_DETAILS_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_ACCOUNT_LIST = "FETCH_ACCOUNT_LIST",
    FETCH_ACCOUNT_LIST_SUCCESS = "FETCH_ACCOUNT_LIST_SUCCESS",
    FETCH_ACCOUNT_MY_LIST = "FETCH_ACCOUNT_MY_LIST",
    FETCH_ACCOUNT_MY_LIST_SUCCESS = "FETCH_ACCOUNT_MY_LIST_SUCCESS",
    CLEAR_LISTS = "CLEAR_LISTS",
    SET_SNACKBARS = "SET_SNACKBARS",
    FETCH_CREATED_LIST = "FETCH_CREATED_LIST",
    FETCH_CREATED_LIST_SUCCESS = "FETCH_CREATED_LIST_SUCCESS",
    DELETE_RATING = "DELETE_RATING"
}

interface deleteRating {
    type:accountActionCreators.DELETE_RATING
}

interface fetchAccountSuccessAction {
    type: accountActionCreators.FETCH_ACCOUNT_DETAILS_SUCCESS,
    payload: IAccountPayload,
}

interface fetchList {type:accountActionCreators.FETCH_ACCOUNT_LIST}

interface fetchListSuccess {
    type:accountActionCreators.FETCH_ACCOUNT_LIST_SUCCESS,
    payload: IMoviesTvsPayload
}

interface fetchMyList {type:accountActionCreators.FETCH_ACCOUNT_MY_LIST}

interface fetchMyListSuccess {
    type:accountActionCreators.FETCH_ACCOUNT_MY_LIST_SUCCESS,
    payload: IAccountMyLists
}

interface clearLists {
    type:accountActionCreators.CLEAR_LISTS
}

interface commonFetchError {
    type:accountActionCreators.FETCH_ERROR
    error:string
}

interface setSnackbars {
    type: accountActionCreators.SET_SNACKBARS,
    message:string,
    isOpen:boolean
}

interface fetchCreatedList {
    type: accountActionCreators.FETCH_CREATED_LIST
}
interface fetchCreatedListSuccess {
    type: accountActionCreators.FETCH_CREATED_LIST_SUCCESS
    payload: IAccountCreatedListPayload
}

export type accountActions = fetchAccountSuccessAction | commonFetchError | fetchList |
    fetchListSuccess | fetchMyList | fetchMyListSuccess | clearLists | setSnackbars |
    fetchCreatedList | fetchCreatedListSuccess | deleteRating
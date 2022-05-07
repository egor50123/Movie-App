import {IAccountLists, IAccountMyLists, IAccountPayload} from "../../models/payloadAPI_M";

export interface accountState {
    error:string | null,
    details: {
        payload: IAccountPayload | null,
    }
    list: {
        isLoading: boolean
        payload:IAccountLists | null
    }
    myList: {
        isLoading: boolean,
        payload:IAccountMyLists | null
    }
}

export enum accountActionCreators {
    FETCH_ACCOUNT_DETAILS_SUCCESS = "FETCH_ACCOUNT_DETAILS_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_ACCOUNT_LIST = "FETCH_ACCOUNT_LIST",
    FETCH_ACCOUNT_LIST_SUCCESS = "FETCH_ACCOUNT_LIST_SUCCESS",
    FETCH_ACCOUNT_MY_LIST = "FETCH_ACCOUNT_MY_LIST",
    FETCH_ACCOUNT_MY_LIST_SUCCESS = "FETCH_ACCOUNT_MY_LIST_SUCCESS"
}

interface fetchAccountSuccessAction {
    type: accountActionCreators.FETCH_ACCOUNT_DETAILS_SUCCESS,
    payload: IAccountPayload,
}

interface fetchList {type:accountActionCreators.FETCH_ACCOUNT_LIST}
interface fetchListSuccess {
    type:accountActionCreators.FETCH_ACCOUNT_LIST_SUCCESS,
    payload: IAccountLists
}

interface fetchMyList {type:accountActionCreators.FETCH_ACCOUNT_MY_LIST}
interface fetchMyListSuccess {
    type:accountActionCreators.FETCH_ACCOUNT_MY_LIST_SUCCESS,
    payload: IAccountMyLists
}



interface commonFetchError {
    type:accountActionCreators.FETCH_ERROR
    error:string
}

export type accountActions = fetchAccountSuccessAction | commonFetchError | fetchList |
    fetchListSuccess | fetchMyList | fetchMyListSuccess
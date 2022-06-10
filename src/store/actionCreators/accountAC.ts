import {Dispatch} from "react";
import {accountAPI, MTPAPI} from "../../API/indexAPI";
import {accountActionCreators, accountActions} from "../types/accountT";
import {IAccountCommon, IListParams} from "../../models/ProfileM";
import {MTP} from "../../constants/constants";

export const  fetchAccount = (sessionId:string) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            let response = await accountAPI.getAccount(sessionId);
            dispatch({type:accountActionCreators.FETCH_ACCOUNT_DETAILS_SUCCESS,payload:response.data})
        }
        catch (e) {
            dispatch({type:accountActionCreators.FETCH_ERROR,error:"error"})
        }
    }
}

export const postFavorite = (settings:IAccountCommon) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            let response = await MTPAPI.getAccountStates({type:MTP.movie,id:settings.itemId,sessionId:settings.sessionId})
            if (response.data.favorite) {
                settings.isToAdd = false
            }
            await accountAPI.setFavorite(settings);
        }
        catch (e) {
            alert("error")
        }
    }
}

export const postWatchList = (settings:IAccountCommon) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            let response = await MTPAPI.getAccountStates({type:MTP.movie,id:settings.itemId,sessionId:settings.sessionId})
            if (response.data.watchlist) {
                settings.isToAdd = false
            }
            await accountAPI.setWatchList(settings);
        }
        catch (e) {
            alert("error")
        }
    }
}

export const getList = (settings:IListParams) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            dispatch({type:accountActionCreators.FETCH_ACCOUNT_LIST})
            let response = await accountAPI.getList(settings);
            dispatch({type:accountActionCreators.FETCH_ACCOUNT_LIST_SUCCESS,payload:response.data})
        }
        catch (e) {
            dispatch({type:accountActionCreators.FETCH_ERROR,error:"error"})
        }
    }
}

export const clearLists = () => ({type:accountActionCreators.CLEAR_LISTS})
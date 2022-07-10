import {Dispatch} from "react";
import {accountAPI, MTPAPI} from "../../API/indexAPI";
import {accountActionCreators, accountActions} from "../types/accountT";
import {
    IAccountCommon, IDeleteRate,
    IListAddAPI,
    IListParams,
    IMarkedLists,
    IRateAPI
} from "../../models/ProfileM";
import {MTP} from "../../constants/constants";
const DELAY_SNACKBAR = 2000

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
            let message = settings.isToAdd ? `Добавлено в избранное!` : "Удалено из избранных"
            dispatch({type:accountActionCreators.SET_SNACKBARS,message:message,isOpen:true})

            setTimeout(() => {
                dispatch({type:accountActionCreators.SET_SNACKBARS,message:``,isOpen:false})
            },DELAY_SNACKBAR)

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
            let message = settings.isToAdd ? `Добавлено в закладки!` : "Удалено из закладок"
            dispatch({type:accountActionCreators.SET_SNACKBARS,message:message,isOpen:true})

            setTimeout(() => {
                dispatch({type:accountActionCreators.SET_SNACKBARS,message:``,isOpen:false})
            },DELAY_SNACKBAR)
        }
        catch (e) {
            alert("error")
        }
    }
}

export const postRate = (settings:IRateAPI) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            await accountAPI.setRate(settings);
            dispatch({type:accountActionCreators.SET_SNACKBARS,message:`Ваша оценка: ${settings.rate}`,isOpen:true})

            setTimeout(() => {
                dispatch({type:accountActionCreators.SET_SNACKBARS,message:``,isOpen:false})
            },DELAY_SNACKBAR)
        }
        catch (e) {
            alert("error")
        }
    }
}

export const postListItem = (settings:IListAddAPI) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
                await accountAPI.addListItem(settings);

            if (settings.type === MTP.tv) {
                throw new Error()
            }


            dispatch({type:accountActionCreators.SET_SNACKBARS,message:`Добавлено`,isOpen:true})

            setTimeout(() => {
                dispatch({type:accountActionCreators.SET_SNACKBARS,message:``,isOpen:false})
            },DELAY_SNACKBAR)
        }
        catch (e) {
            dispatch({type:accountActionCreators.SET_SNACKBARS,message:`Этот элемент уже в списке`,isOpen:true})
            setTimeout(() => {
                dispatch({type:accountActionCreators.SET_SNACKBARS,message:`Этот элемент уже в списке`,isOpen:false})
            },DELAY_SNACKBAR)
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

export const getCreatedList = (settings:IMarkedLists) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            dispatch({type:accountActionCreators.FETCH_CREATED_LIST})
            let response = await accountAPI.getCreatedLists(settings);
            dispatch({type:accountActionCreators.FETCH_CREATED_LIST_SUCCESS,payload:response.data})
        }
        catch (e) {
            dispatch({type:accountActionCreators.FETCH_ERROR,error:"error"})
        }
    }
}

export const deleteRating = (settings:IDeleteRate) => {
    return async (dispatch: Dispatch<accountActions>) => {
        try {
            await accountAPI.deleteRating(settings);

            dispatch({type:accountActionCreators.SET_SNACKBARS,message:`Удалено`,isOpen:true})

            setTimeout(() => {
                dispatch({type:accountActionCreators.SET_SNACKBARS,message:``,isOpen:false})
            },DELAY_SNACKBAR)
        }catch (e) {
            alert("что-то пошло не так")
        }
    }
}


export const clearLists = () => ({type:accountActionCreators.CLEAR_LISTS})
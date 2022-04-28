import {Dispatch} from "react";
import {authAPI} from "../../API/indexAPI";
import {authActionCreators, authActions} from "../types/authT";

export const  fetchAuthToken = () => {
    return async (dispatch: Dispatch<authActions>) => {
        try {
            dispatch({type:authActionCreators.FETCH_TOKEN})
            let response = await authAPI.createToken();
            let payload = response.data
            dispatch({type:authActionCreators.FETCH_TOKEN_SUCCESS,payload})
        }
        catch (e) {
            dispatch({type:authActionCreators.FETCH_TOKEN_ERROR,error:"error"})
        }
    }
}

export const setAuthTokenLocal  = (token:string) => ({type:authActionCreators.SET_TOKEN_LOCAL, token})

export const createSession = (name:string) => {
    return async (dispatch: Dispatch<authActions>) => {
        try {
            dispatch({type:authActionCreators.CREATE_SESSION})
            let response = await authAPI.createSession(name);
            let payload = response.data
            dispatch({type:authActionCreators.CREATE_SESSION_SUCCESS,payload})
        }
        catch (e) {
            dispatch({type:authActionCreators.CREATE_SESSION_ERROR,error:"error"})
        }
    }
}

export const deleteSession = (session:string) => {
    return async (dispatch: Dispatch<authActions>) => {
        try {
            await authAPI.deleteSession(session);
            dispatch({type:authActionCreators.DELETE_SESSION})
        }
        catch (e) {
            alert("ошибка")
        }
    }
}


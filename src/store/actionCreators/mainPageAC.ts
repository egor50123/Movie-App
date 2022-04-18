import {MainPageActions, MainPageActionTypes} from "../types/mainPageT";
import {PreviewItemsTypes} from "../../models/previewItem_SwitchM";
import {Dispatch} from "react";
import {commonAPI} from "../../API/indexAPI";

export const setCurrentSwitch = (id:number,currentSwitch:PreviewItemsTypes) => ({type:MainPageActionTypes.SET_SWITCH,currentSwitch,id})

export const  fetchGenres = () => {
    return async (dispatch: Dispatch<MainPageActions>) => {
        try {
            dispatch({type:MainPageActionTypes.FETCH_GENRES})
            let response = await commonAPI.getGenres();
            dispatch({type:MainPageActionTypes.FETCH_GENRES_SUCCESS,payload:response.data.genres})
        }
        catch (e) {
            dispatch({type:MainPageActionTypes.FETCH_GENRES_ERROR,error:"error"})
        }
    }
}
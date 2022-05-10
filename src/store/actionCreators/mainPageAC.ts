import {MainPageActions, MainPageActionTypes, TGenreTypes} from "../types/mainPageT";
import {PreviewItemsTypes} from "../../models/previewItem_SwitchM";
import {Dispatch} from "react";
import {commonAPI} from "../../API/indexAPI";

export const setCurrentSwitch = (id:number,currentSwitch:PreviewItemsTypes) => ({type:MainPageActionTypes.SET_SWITCH,currentSwitch,id})

export const  fetchGenres = (typeGenre:TGenreTypes) => {
    return async (dispatch: Dispatch<MainPageActions>) => {
        try {
            dispatch({type:MainPageActionTypes.FETCH_GENRES,typeGenre})
            let response = await commonAPI.getGenres(typeGenre);
            dispatch({type:MainPageActionTypes.FETCH_GENRES_SUCCESS,payload:response.data.genres,typeGenre})
        }
        catch (e) {
            dispatch({type:MainPageActionTypes.FETCH_GENRES_ERROR,error:"error",typeGenre})
        }
    }
}
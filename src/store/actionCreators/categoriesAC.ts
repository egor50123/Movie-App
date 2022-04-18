import {Dispatch} from "react";
import {categoriesAPI} from "../../API/indexAPI";
import {CategoriesAC, CategoriesAction} from "../types/categoriesT";
import {IFilterSettings} from "../../models/categoriesM";

export const  fetchCategoriesItems = (settings:IFilterSettings) => {
    return async (dispatch: Dispatch<CategoriesAction>) => {
        try {
            dispatch({type:CategoriesAC.FETCH_CATEGORIES})
            let response = await categoriesAPI.getResults(settings);
            let payload = response.data
            dispatch({type:CategoriesAC.FETCH_CATEGORIES_SUCCESS,payload})
        }
        catch (e) {
            dispatch({type:CategoriesAC.FETCH_CATEGORIES_ERROR,error:"error"})
        }
    }
}


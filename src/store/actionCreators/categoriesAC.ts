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
            setTimeout (() => {
                ///!!!!!!!!!!!!!!!!!!
                dispatch({type:CategoriesAC.FETCH_CATEGORIES_SUCCESS,payload})
            },300)

        }
        catch (e) {
            dispatch({type:CategoriesAC.FETCH_CATEGORIES_ERROR,error:"error"})
        }
    }
}

export const clearCategories = () => ({type:CategoriesAC.CLEAR_CATEGORIES})


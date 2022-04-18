import {ICategoriesPayload} from "../../models/payloadAPI_M";

export interface categoriesState {
    payload: ICategoriesPayload | null
    isLoading: boolean,
    error: string | null
}

export enum CategoriesAC {
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",

}

interface FetchCategoriesAction {
    type: CategoriesAC.FETCH_CATEGORIES,
}

interface FetchCategoriesSuccessAction {
    type: CategoriesAC.FETCH_CATEGORIES_SUCCESS,
    payload: ICategoriesPayload,
}

interface FetchCategoriesErrorAction {
    type: CategoriesAC.FETCH_CATEGORIES_ERROR,
    error: string,
}



export type CategoriesAction = FetchCategoriesAction | FetchCategoriesSuccessAction | FetchCategoriesErrorAction
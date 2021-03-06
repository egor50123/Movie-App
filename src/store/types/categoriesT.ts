import {IMoviesTvsPayload, TMoviesTvsPayloadResults} from "../../models/payloadAPI_M";
import {MTP_TYPES} from "../../constants/constants";

export interface categoriesState {
    payload: IMoviesTvsPayload | null,
    payloadResults: TMoviesTvsPayloadResults | []
    isLoading: boolean,
    error: string | null,
    nextPage: number,
    isEnd: boolean
    type: MTP_TYPES | null
}

export enum CategoriesAC {
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
    CLEAR_CATEGORIES = "CLEAR_CATEGORIES"
}

interface FetchCategoriesAction {
    type: CategoriesAC.FETCH_CATEGORIES,
}

interface FetchCategoriesSuccessAction {
    type: CategoriesAC.FETCH_CATEGORIES_SUCCESS,
    payload: IMoviesTvsPayload,
    typeMTP: MTP_TYPES
}

interface FetchCategoriesErrorAction {
    type: CategoriesAC.FETCH_CATEGORIES_ERROR,
    error: string,
}

interface ClearCategories {
    type: CategoriesAC.CLEAR_CATEGORIES
}



export type CategoriesAction = FetchCategoriesAction | FetchCategoriesSuccessAction | FetchCategoriesErrorAction | ClearCategories
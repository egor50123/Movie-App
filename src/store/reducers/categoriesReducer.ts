import {CategoriesAC, CategoriesAction, categoriesState} from "../types/categoriesT";
import {TMoviesTvsPayloadResults} from "../../models/payloadAPI_M";

const init: categoriesState = {
    isLoading:false,
    error:null,
    payload: null,
    payloadResults: [],
    nextPage:1
}

export const categoriesReducer = (state = init, action: CategoriesAction): categoriesState => {
    switch (action.type) {
        case CategoriesAC.FETCH_CATEGORIES:
            return {...state,isLoading:true}
        case CategoriesAC.FETCH_CATEGORIES_SUCCESS:
            return {...state,isLoading:false,
                payload:action.payload,
                payloadResults: [...state.payloadResults, ...action.payload.results] as TMoviesTvsPayloadResults,
                nextPage: action.payload.page + 1}
        case CategoriesAC.FETCH_CATEGORIES_ERROR:
            return {...state,isLoading:false,error:action.error}
        case CategoriesAC.CLEAR_CATEGORIES:
            return {
                ...state,
                payloadResults: [],
                nextPage: 1
            }
        default:
            return state
    }
}
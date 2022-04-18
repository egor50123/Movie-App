import {CategoriesAC, CategoriesAction, categoriesState} from "../types/categoriesT";

const init: categoriesState = {
    isLoading:false,
    error:null,
    payload: null,

}

export const categoriesReducer = (state = init, action: CategoriesAction): categoriesState => {
    switch (action.type) {
        case CategoriesAC.FETCH_CATEGORIES:
            return {...state,isLoading:true}
        case CategoriesAC.FETCH_CATEGORIES_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case CategoriesAC.FETCH_CATEGORIES_ERROR:
            return {...state,isLoading:false,error:action.error}
        default:
            return state
    }
}
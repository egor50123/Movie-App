import {categoriesFilterAC, categoriesFilterAction} from "../types/categoriesFilterT";

export const categoriesFilterUpdate = (settings:{}):categoriesFilterAction => ({type:categoriesFilterAC.UPDATE_FILTER,settings})
export const categoriesFilterReset = ():categoriesFilterAction => ({type:categoriesFilterAC.RESET_FILTER})
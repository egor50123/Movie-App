import {cardActions, cardActionTypes} from "../types/card";

export const deleteCard = (id:number):cardActions => ({type:cardActionTypes.DELETE_CARD, id})
export const clearDeleteCardIds = ():cardActions => ({type:cardActionTypes.CLEAR_DELETE_CARD__IDS})
export const updateListId = (id:number):cardActions => ({type:cardActionTypes.UPDATE_OPEN_LIST_ID, id})
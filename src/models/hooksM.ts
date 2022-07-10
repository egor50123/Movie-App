import {MT_TYPES, MTP_TYPES} from "../constants/constants";

export interface IUseFavorite {
    itemId:number,
    isFavorite:boolean,
}

export interface IUseWatchList {
    itemId:number,
    isToWatchList:boolean,
}

export interface IRate {
    type: MTP_TYPES,
    rate: number,
    itemId: number,
}

export interface IList {
    type: MT_TYPES,
    itemId: number,
    listId: number
}

export interface IRateDel {
    type: MTP_TYPES,
    itemId: number,
}
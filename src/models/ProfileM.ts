import {MT_TYPES, MTP_TYPES} from "../constants/constants";

export enum ProfileLinksNames {
    watchlist = "watchlist",
    ratings = "ratings",
    favorites = "favorites",
    lists = "lists"
}

export type ListWrapperTypes = "watchlist" | "ratings" | "favorites"

export enum ListAPIParam {
    favorite = "favorite",
    rated = "rated",
    watchlist = "watchlist"
}
export type TListAPIParamType = ListAPIParam.rated | ListAPIParam.favorite | ListAPIParam.watchlist

export interface IListParams {
    sessionId:string,
    acID:number,
    type: TListAPIParamType
}

export interface IDeleteRate {
    sessionId: string,
    type: MTP_TYPES,
    itemId:number
}

export interface IAccountCommon {
    sessionId:string,
    itemId:number,
    acID:number,
    isToAdd:boolean
}

export interface IRateAPI {
    type: MTP_TYPES,
    sessionId:string,
    itemId:number,
    rate: number
}

export interface IListAddAPI {
    type: MT_TYPES,
    sessionId:string,
    itemId:number,
    listId: string | number
}



export interface IMarkedLists {
    acID:number,
    sessionId:string,
}
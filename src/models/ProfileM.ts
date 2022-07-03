import {MT_TYPES} from "../constants/constants";
import {IListBtnCurrentList} from "../components/Common/Buttons/ListBtn";

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

export interface IListParamsPre {
    sessionId: string | undefined,
    acID: number | undefined,
    type: string | null
}

export interface IAccountCommon {
    sessionId:string,
    itemId:number,
    acID:number,
    isToAdd:boolean
}

export interface IRateAPI {
    type: MT_TYPES,
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

export interface IListAddSettings {
    type: MT_TYPES,
    sessionId:string,
    itemId:number,
    listData: IListBtnCurrentList
}


export interface IMarkedLists {
    acID:number,
    sessionId:string,
}
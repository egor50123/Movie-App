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


export interface IMarkedLists {
    account_id:number,
    session_id:number,
}
export enum ProfileLinksNames {
    watchlist = "watchlist",
    ratings = "ratings",
    favorites = "favorites",
    lists = "lists"
}

export type ListWrapperTypes = "watchlist" | "ratings" | "favorites"

export type TListAPIParamType = "favorite" | "rated" | "watchlist"

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

export interface IFavorite {
    sessionId:string,
    itemId:number,
    acID:number,
    isFavorite:boolean
}
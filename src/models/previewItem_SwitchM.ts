export enum EPreviewItems {
    Movies = "Movies",
    Tv = "Tv",
    Trailers= "Trailers",
    Trends = "Trends",
}

export type PreviewItemsTypes = EPreviewItems.Movies | EPreviewItems.Tv | EPreviewItems.Trailers | EPreviewItems.Trends
//-----------------------------------------------------------------------------------------------
export type MovieSwitchTypes = "now_playing" | "popular" | "upcoming" | "top_rated"
export type TvSwitchTypes = "popular" | "airing_today" | "on_the_air" | "top_rated"
export type TrendsSwitchTypes = "day" | "week"
export type TrailersSwitchTypes = "movie" | "tv"

export interface ISwitch {
    [key:string]: {
        [key:number]:MovieSwitchTypes | TvSwitchTypes | TrendsSwitchTypes,
    }
}

export interface IPreviewItemPure {
    title:string,
    type: PreviewItemsTypes,
    switchType:number,
    switchTitles:string[][],
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: any[],
        },
    }
}

export enum ESwitch {
    now_playing = "now_playing",
    popular = "popular",
    upcoming= "upcoming",
    top_rated = "top_rated",
    airing_today = "airing_today",
    on_the_air = "on_the_air",
    day = "day",
    week = "week",
    movie = "movie",
    tv = "tv"
}




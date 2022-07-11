import {IMoviesTvsPayload} from "./payloadAPI_M";
import {EPreviewItems} from "../constants/constants";


export type PreviewItemsTypes = EPreviewItems.Movies | EPreviewItems.Tv | EPreviewItems.Trailers | EPreviewItems.Trends
//-----------------------------------------------------------------------------------------------
export type MovieSwitchTypes = "now_playing" | "popular" | "upcoming" | "top_rated"
export type TvSwitchTypes = "popular" | "airing_today" | "on_the_air" | "top_rated"
export type TrendsSwitchTypes = "day" | "week"
export type TrailersSwitchTypes = "movie" | "tv"

export interface IPreviewItemPure {
    title:string,
    type: PreviewItemsTypes,
    switchType:number,
    switchTitles:string[][],
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: IMoviesTvsPayload | null,
        },
    }
}


export interface IPreviewItem {
    title:string,
    type:PreviewItemsTypes,
    switchTitles:string[][]
}

export interface ISwitch {
    type:PreviewItemsTypes,
    switchTitles:string[][]
}




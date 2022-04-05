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

export interface ISwitch {
    [EPreviewItems.Movies]: {
        [key: number]: MovieSwitchTypes
    },
    [EPreviewItems.Tv]: {
        [key: number]: TvSwitchTypes
    }
}

export enum ESwitch {
    now_playing = "now_playing",
    popular = "popular",
    upcoming= "upcoming",
    top_rated = "top_rated",
    airing_today = "airing_today",
    on_the_air = "on_the_air",
}




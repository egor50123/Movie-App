export enum Types {
    Movies = "Movies",
    Tv = "Tv",
    Trailers= "Trailers",
    Trends = "Trends",
}

export enum PreviewItemType {
    Movies = "Movies",
    Tv = "Tv"
}

interface ISwitch {
    movies: {
        [key: number]: "now_playing" | "popular" | "upcoming" | "top_rated"
    },
    tv: {
        [key: number]: "popular" | "airing_today" | "on_the_air" | "top_rated"
    }
}

// movies: {
//     [key: number]: "now_playing" | "popular" | "upcoming" | "top_rated"
// },
// tv: {
//     [key: number]: "popular" | "airing_today" | "on_the_air" | "top_rated"
// }

type MovieSwitchTypes = "now_playing" | "popular" | "upcoming" | "top_rated"
type TvSwitchTypes = "popular" | "airing_today" | "on_the_air" | "top_rated"
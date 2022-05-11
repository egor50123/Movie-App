export interface ICategoriesPayload {
    results: [{
        title:string,
        poster_path:string | null,
        backdrop_path:string | null,
        release_date:string,
        vote_average:number,
        id:number,
        genre_ids:number[],
        original_language:string,
        overview:string
    }]
}

export type TCountriesPayload = [{
    iso_3166_1:string
}] | null

export interface commonPayloadTvMovie{
    overview:string,
    poster_path:string | null,
    backdrop_path:string | null,
    genres: [{
        id:number,
        name:string
    }],
    videos:{
        results:[{
            key:string,
            name:string
        }]
    } | null,
    vote_average:string,
    vote_count:string,
    tagline:string,
    id:number
}

export interface IMoviePayload extends commonPayloadTvMovie{
    original_title:string,
    release_date:string,
    title:string,
    runtime: number,
    homepage:string,
    belongs_to_collection: {
        backdrop_path:string,
        id:string,
        name:string,
        poster_path:string
    } | null,
}

export interface ISearchItemPayload {
    media_type:string,
    id:number,
    poster_path?:string,
    backdrop_path?:string,
    profile_path?:string,
    name?:string
    title?:string,
}

export interface ISearchPayload {
    results: [ISearchItemPayload]
}

export interface ITvPayload extends commonPayloadTvMovie{
    episode_run_time: number[],
    last_episode_to_air: {
        air_date:string,
        episode_number:string,
        name:string,
        overview:string,
        season_number:string,
        still_path:string | null,
        vote_average:number,
        vote_count:string,
    },
    first_air_date:string
    name:string,
    number_of_episodes:number,
    number_of_seasons:number,
    original_name:string,
    popularity:string,
    seasons: {
        air_date:string,
        episode_count:number,
        name:string,
        poster_path:string,
        season_number:number,
    }
    status:string,
}

export interface IPeoplePayload {
    cast:[{
        name:string,
        profile_path:string,
        character:string
        id:string
    }]
}

export interface ISimilarMoviesPayload {
    results:[{
        backdrop_path:string | null,
        poster_path:string | null,
        title:string,
        release_date:string
    }] | null
}

export type TGenresPayload = [{
    id:number,
    name:string
}]

export interface IAccountPayload {
    id: number,
    username: string,
    name:string
}

type TAccountListsResults = [{
    adult: false,
    backdrop_path: null | string,
    genre_ids: number[],
    id: number,
    original_title: string,
    overview: string,
    release_date: string,
    poster_path: null | string,
    popularity: number,
    title: string,
    vote_average: number,
    vote_count: number
}]
export interface IAccountLists {
    results: TAccountListsResults
}

export interface IAccountMyLists{
    created_by:string,
    description:string,
    favorite_count:string,
    id:number,
    items: TAccountListsResults,
    item_count:number,
    name:string,
    poster_path:string | null
}

export interface IMoviesTvsPayload {
    results: [{
        backdrop_path:string,
        poster_path:string,
        vote_average:number,
        rating:number,
        overview:string,
        release_date?:string,
        first_air_date?:string,
        title?:string,
        name?:string
        id:number,
        origin_country:string[],
        genre_ids:number[]

    }]
}
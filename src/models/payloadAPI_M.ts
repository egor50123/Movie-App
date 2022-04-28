export interface ICategoriesPayload {
    results: [{
        title:string,
        poster_path:string,
        release_date:string,
        vote_average:string,
        id:string
    }]
}

export type TCountriesPayload = [{
    iso_3166_1:string
}] | null

export interface IMovieTvPersonPayload {
    overview:string,
    poster_path:string | null,
    backdrop_path:string | null
    genres: [{
        id:number,
        name:string
    }] | null,
    original_title:string,
    vote_average:string,
    vote_count:string,
    release_date:string,
    title?:string,
    name?:string,
    videos:{
        results:[{
            key:string,
            name:string
        }]
    } | null,
    runtime: number,
    homepage:string,
    belongs_to_collection: {
        backdrop_path:string,
        id:string,
        name:string,
        poster_path:string
    } | null,
    tagline?:string
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
    id:string,
    name:string
}]
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
    id:string,
    name:string
}]
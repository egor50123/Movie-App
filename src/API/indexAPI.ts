import axios from "axios";
import {MovieSwitchTypes, TrailersSwitchTypes, TrendsSwitchTypes, TvSwitchTypes} from "../models/previewItem_SwitchM";
import {MovieTvItemType} from "../pages/CategoriesPage/MovieTvItem/MovieTvItem";

export const API_KEY = "cb16c889cb26730cf04918e138034c54"
export const BASE_URI = "&language=ru&page=1"
export const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
export const BIG_IMG_URL = "https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/"
export const YOUTUBE_URL = "https://www.youtube.com/embed/"
export const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
})

export interface IMovieTvPerson {
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
    title:string,
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
    } | null
}

export interface IPeople {
    cast:[{
        name:string,
        profile_path:string,
        character:string
        id:string
    }]
}


export const movieAPI = {
    getMovies(type:MovieSwitchTypes) {
        return instance.get(`movie/${type}?api_key=${API_KEY}${BASE_URI}`)
    },
    getSearchedMovies(text:string) {
        return instance.get(`/search/movie?api_key=${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
    getMovie(id:string) {
        return instance.get<IMovieTvPerson>(`/movie/${id}?api_key=${API_KEY}${BASE_URI}&include_adult=false&append_to_response=videos,peoples`)
    },
}

export const tvAPI = {
    getTv(type:TvSwitchTypes) {
        return instance.get(`tv/${type}?api_key=${API_KEY}${BASE_URI}`)
    },
    getTvItem(id:string) {
        return instance.get<IMovieTvPerson>(`/tv/${id}?api_key=${API_KEY}${BASE_URI}&include_adult=false`)
    }
}

export const trendsAPI = {
    getTrends(type:TrendsSwitchTypes) {
        return instance.get(`trending/all/${type}?api_key=${API_KEY}${BASE_URI}`)
    }
}

export const trailersAPI = {
    getTrailers(type:TrailersSwitchTypes) {
        return instance.get(`${type}/latest?api_key=${API_KEY}&language=ru`)
    }
}

export const peopleAPI = {
    getPeople(type:MovieTvItemType,id:string) {
        return instance.get<IPeople>(`${type}/${id}/credits?api_key=${API_KEY}&${BASE_URI}`)
    }
}




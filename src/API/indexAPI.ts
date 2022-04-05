import axios from "axios";
import {MovieSwitchTypes, TvSwitchTypes} from "../models/previewItem_SwitchM";

export const API_KEY = "cb16c889cb26730cf04918e138034c54"
export const BASE_URI = "&language=ru&page=1"
export const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
})

interface IMovieTvPerson {
    original_title: string,
    overview:string
}


export const movieAPI = {
    getMovies(type:MovieSwitchTypes) {
        return instance.get(`movie/${type}?api_key=${API_KEY}${BASE_URI}`)
    },
    getSearchedMovies(text:string) {
        return instance.get(`/search/movie?api_key=${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
    getMovie(id:string) {
        return instance.get<IMovieTvPerson>(`/movie/${id}?api_key=${API_KEY}${BASE_URI}&include_adult=false`)
    }
}

export const tvAPI = {
    getTv(type:TvSwitchTypes) {
        return instance.get(`tv/${type}?api_key=${API_KEY}${BASE_URI}`)
    },
}



import axios from "axios";
import {MovieSwitchTypes, TrailersSwitchTypes, TrendsSwitchTypes, TvSwitchTypes} from "../models/previewItem_SwitchM";
import {MovieTvItemType} from "../pages/CategoriesPage/MovieTvItem/MovieTvItem";
import {IFilterSettings} from "../models/categoriesM";
import {
    IAccountLists,
    IAccountPayload,
    ICategoriesPayload, IMoviePayload,
    IPeoplePayload,
    ISimilarMoviesPayload, ITvPayload,
    TGenresPayload
} from "../models/payloadAPI_M";
import {authPayload, deleteSessionPayload, sessionPayload} from "../store/types/authT";
import {IFavorite, IListParams} from "../models/ProfileM";

export const API_KEY = "api_key=cb16c889cb26730cf04918e138034c54"
export const BASE_URI = "&language=ru&page=1&region=ru"
export const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
export const BIG_IMG_URL = "https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/"
export const YOUTUBE_URL = "https://www.youtube.com/embed/"
export const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
})

export interface IGenres {
    genres: TGenresPayload
}

export const movieAPI = {
    getMovies(type: MovieSwitchTypes) {
        return instance.get(`movie/${type}?${API_KEY}${BASE_URI}`)
    },
    getSearchedMovies(text: string) {
        return instance.get(`/search/movie?${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
    getMovie(id: string) {
        return instance.get<IMoviePayload>(`/movie/${id}?${API_KEY}${BASE_URI}&include_adult=false&append_to_response=videos,peoples`)
    },
    getSimilar(id: string) {
        return instance.get<ISimilarMoviesPayload>(`/movie/${id}/similar?${API_KEY}${BASE_URI}`)
    }
}

export const tvAPI = {
    getTv(type: TvSwitchTypes) {
        return instance.get(`tv/${type}?${API_KEY}${BASE_URI}`)
    },
    getTvItem(id: string) {
        return instance.get<ITvPayload>(`/tv/${id}?${API_KEY}${BASE_URI}&include_adult=false&append_to_response=videos,peoples`)
    }
}

export const trendsAPI = {
    getTrends(type: TrendsSwitchTypes) {
        return instance.get(`trending/all/${type}?${API_KEY}${BASE_URI}`)
    }
}

export const trailersAPI = {
    getTrailers(type: TrailersSwitchTypes) {
        return instance.get(`${type}/latest?${API_KEY}&language=ru`)
    }
}

export const peopleAPI = {
    getPeople(type: MovieTvItemType, id: string) {
        return instance.get<IPeoplePayload>(`${type}/${id}/credits?${API_KEY}&${BASE_URI}`)
    }
}

export const categoriesAPI = {
    getResults({
                   type,
                   maxRuntime,
                   minRuntime,
                   minRank,
                   maxYear,
                   minYear,
                   maxRank,
                   sortType,
                   withReleaseType,
                   withGenres
               }: IFilterSettings) {
        const dateStart = `&primary_release_date.gte=${minYear}`
        const dateEnd = `&primary_release_date.lte=${maxYear}`
        const rankStart = `&vote_average.gte=${minRank}`
        const rankEnd = `&vote_average.lte=${maxRank}`
        const runtimeStart = `&with_runtime.gte=${minRuntime}`
        const runtimeEnd = `&with_runtime.lte=${maxRuntime}`
        const sortBy = `&sort_by=${sortType}`
        const withRT = `&with_release_type=${withReleaseType}`
        const genres = `&with_genres=${withGenres}`.slice(0, -1)

        const basicSettings = `&vote_count.gte=10&certification_country=RU`
        return instance.get<ICategoriesPayload>(`discover/${type}?${API_KEY}&${BASE_URI}${dateStart}${dateEnd}${rankStart}${rankEnd}${genres}${runtimeStart}${runtimeEnd}${sortBy}${withRT}${genres}${basicSettings}`)
    },
    getCountries() {
        return instance.get(`/configuration/countries?${API_KEY}`)
    },
}

export const commonAPI = {
    getGenres() {
        return instance.get<IGenres>(`/genre/movie/list?${API_KEY}&${BASE_URI}`)
    }
}

export const authAPI = {
    createToken() {
        return instance.get<authPayload>(`/authentication/token/new?${API_KEY}`)
    },

    createSession(token: string) {
        return instance.post<sessionPayload>(`/authentication/session/new?${API_KEY}`, {
            request_token: token,
        })
    },
    deleteSession(session: string) {
        return instance.delete<deleteSessionPayload>(`/authentication/session?${API_KEY}`, {
            data: {
                session_id: session,
            }
        })
    },
}

export const accountAPI = {
    getAccount(sessionId: string) {
        return instance.get<IAccountPayload>(`/account?${API_KEY}&session_id=${sessionId}`)
    },
    setFavorite({sessionId, acID, itemId, isFavorite}:IFavorite) {
        return instance.post(`https://api.themoviedb.org/3/account/${acID}/favorite?${API_KEY}&session_id=${sessionId}`, {
            "media_type": "movie",
            "media_id": itemId,
            "favorite": isFavorite
        }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })
    },
    getList ({sessionId, acID, type}:IListParams) {
        return instance.get<IAccountLists>(`/account/${acID}/${type}/movies?${API_KEY}&session_id=${sessionId}&language=ru&page=1`)
    },
}




import axios from "axios";
import {MovieSwitchTypes, TrailersSwitchTypes, TrendsSwitchTypes, TvSwitchTypes} from "../models/previewItem_SwitchM";
import {IFilterSettings} from "../models/categoriesM";
import {
    IAccountPayload, IAccountStatesPayload,
    IMoviePayload, IMoviesTvsPayload,
    IPeoplePayload, ISearchPayload,
    ITvPayload,
    TGenresPayload
} from "../models/payloadAPI_M";
import {authPayload, deleteSessionPayload, sessionPayload} from "../store/types/authT";
import {IAccountCommon, IDeleteRate, IListAddAPI, IListParams, IMarkedLists, IRateAPI} from "../models/ProfileM";
import {genreTypes, TGenreTypes} from "../store/types/mainPageT";
import {MTP_TYPES} from "../constants/constants";
import {IAccountStates} from "../models/cardM";

export const API_KEY = "api_key=cb16c889cb26730cf04918e138034c54"
export const BASE_URI = "&language=ru&page=1&region=ru"
export const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
export const SMALL_IMG_URL = 'https://www.themoviedb.org/t/p/w94_and_h141_face'
export const BIG_IMG_URL = "https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,080e40,868686)/"
export const BIG_IMG_FILTER_URL = "https://www.themoviedb.org/t/p/w1920_and_h600_face"
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
    getMovie(id: string) {
        return instance.get<IMoviePayload>(`/movie/${id}?${API_KEY}${BASE_URI}&include_adult=false&append_to_response=videos,peoples`)
    },
    getSimilar(id: string) {
        return instance.get<IMoviesTvsPayload>(`/movie/${id}/similar?${API_KEY}${BASE_URI}`)
    }
}

export const searchAPI = {
    getSearchedMulti(text: string) {
        return instance.get<ISearchPayload>(`/search/multi?${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
    getSearchedMovie(text: string) {
        return instance.get<ISearchPayload>(`/search/movie?${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
    getSearchedTv(text: string) {
        return instance.get<ISearchPayload>(`/search/tv?${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
    getSearchedPerson(text: string) {
        return instance.get<ISearchPayload>(`/search/person?${API_KEY}${BASE_URI}include_adult=false&query=${text}`)
    },
}

export const tvAPI = {
    getTv(type: TvSwitchTypes) {
        return instance.get(`tv/${type}?${API_KEY}${BASE_URI}`)
    },
    getTvItem(id: string) {
        return instance.get<ITvPayload>(`/tv/${id}?${API_KEY}${BASE_URI}&include_adult=false&append_to_response=videos,peoples`)
    }
}

export const MTPAPI = {
    getAccountStates({type, id, sessionId}:IAccountStates) {
        return instance.get<IAccountStatesPayload>(`/${type}/${id}/account_states?${API_KEY}&session_id=${sessionId}`)
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
    getPeople(type: MTP_TYPES, id: string) {
        return instance.get<IPeoplePayload>(`${type}/${id}/credits?${API_KEY}&${BASE_URI}`)
    }
}

export const categoriesAPI = {
    getResults({
                   type,
                   maxRuntime = "",
                   minRuntime = "",
                   minRank = "",
                   maxYear = "",
                   minYear = "",
                   maxRank = "",
                   sortType = "popularity.desc",
                   withReleaseType = "3",
                   withGenres = "",
                   page
               }: IFilterSettings) {
        const dateStart = `&primary_release_date.gte=${minYear}`
        const dateEnd = `&primary_release_date.lte=${maxYear}`
        const rankStart = `&vote_average.gte=${minRank}`
        const rankEnd = `&vote_average.lte=${maxRank}`
        const runtimeStart = `&with_runtime.gte=${minRuntime}`
        const runtimeEnd = `&with_runtime.lte=${maxRuntime}`
        const sortBy = `&sort_by=${sortType}`
        const withRT = `&with_release_type=${withReleaseType}`
        const genres = `&with_genres=${withGenres}`

        const basicSettings = `&vote_count.gte=10&certification_country=RU`
        return instance.get<IMoviesTvsPayload>(`discover/${type}?${API_KEY}&language=ru&page=${page}&region=ru${dateStart}${dateEnd}${rankStart}${rankEnd}${runtimeStart}${runtimeEnd}${sortBy}${withRT}${genres}${basicSettings}`)
    },
    getCountries() {
        return instance.get(`/configuration/countries?${API_KEY}`)
    },
}

export const commonAPI = {
    getGenres(type:TGenreTypes) {
        let currentType = type === genreTypes.genresTv ? "tv" : "movie"
        return instance.get<IGenres>(`/genre/${currentType}/list?${API_KEY}&${BASE_URI}`)
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
    setFavorite({sessionId, acID, itemId, isToAdd}:IAccountCommon) {
        return instance.post(`/account/${acID}/favorite?${API_KEY}&session_id=${sessionId}`, {
            "media_type": "movie",
            "media_id": itemId,
            "favorite": isToAdd
        }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })
    },
    setWatchList({sessionId, acID, itemId, isToAdd}:IAccountCommon) {
        return instance.post(`/account/${acID}/watchlist?${API_KEY}&session_id=${sessionId}`, {
            "media_type": "movie",
            "media_id": itemId,
            "watchlist": isToAdd
        }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })
    },

    setRate({sessionId,itemId,type,rate}:IRateAPI) {
        return instance.post(`/${type}/${itemId}/rating?${API_KEY}&session_id=${sessionId}`, {
            "value": rate
        })
    },

    deleteRating({type,sessionId,itemId}:IDeleteRate) {
        return instance.delete(`/${type}/${itemId}/rating?${API_KEY}&session_id=${sessionId}`,{
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        },)
    },

    getList ({sessionId, acID, type}:IListParams) {
        return instance.get<IMoviesTvsPayload>(`/account/${acID}/${type}/movies?${API_KEY}&session_id=${sessionId}&language=ru&page=1`)
    },

    addListItem({itemId,listId,type,sessionId}:IListAddAPI) {
        return instance.post(`list/${listId}/add_item?${API_KEY}&session_id=${sessionId}`,{
            "media_id": itemId
        },{
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })
    },

    getCreatedLists({acID,sessionId}:IMarkedLists) {
        return instance.get(`/account/${acID}/lists?${API_KEY}&session_id=${sessionId}`)
    }
}




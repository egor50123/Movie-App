import {Dispatch} from "react";
import {movieAPI, peopleAPI, tvAPI} from "../../API/indexAPI";
import {MovieTvPersonAction, MovieTvPersonActionTypes} from "../types/MovieTvPersonT";
import {AxiosResponse} from "axios";
import {IMoviePayload, ITvPayload} from "../../models/payloadAPI_M";
import {MTP_TYPES} from "../../constants/constants";

export const  fetchItem = (id:string,type:MTP_TYPES) => {
    return async (dispatch: Dispatch<MovieTvPersonAction>) => {
        try {
            dispatch({type: MovieTvPersonActionTypes.FETCH_ITEM, itemType:type})
            let response = {} as AxiosResponse<IMoviePayload | ITvPayload>
            switch (type) {
                case "movie": response = await movieAPI.getMovie(id);break;
                case "tv":response = await tvAPI.getTvItem(id);break;
                default:break
            }
            let payload = response.data
            console.log(payload)

            setTimeout(() => {
                dispatch({type: MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS,payload})
            },500)
        }catch (e) {
            dispatch({type: MovieTvPersonActionTypes.FETCH_ITEM_ERROR,error: "error"})
        }
    }
}

export const fetchPeople = (id:string,type:MTP_TYPES) => {
    return async (dispatch: Dispatch<MovieTvPersonAction>) => {
        try {
            dispatch({type: MovieTvPersonActionTypes.FETCH_PEOPLE})
            let response = await peopleAPI.getPeople(type,id)

            setTimeout(() => {
                dispatch({type: MovieTvPersonActionTypes.FETCH_PEOPLE_SUCCESS,payload:response.data})
            },500)
        }catch (e) {
            dispatch({type: MovieTvPersonActionTypes.FETCH_PEOPLE_ERROR,error: "error"})
        }
    }
}

export const fetchSimilar = (id:string) => {
    return async (dispatch: Dispatch<MovieTvPersonAction>) => {
        try {
            dispatch({type: MovieTvPersonActionTypes.FETCH_SIMILAR})
            let response = await movieAPI.getSimilar(id)

            setTimeout(() => {
                dispatch({type: MovieTvPersonActionTypes.FETCH_SIMILAR_SUCCESS,payload:response.data})
            },500)
        }catch (e) {
            dispatch({type: MovieTvPersonActionTypes.FETCH_SIMILAR_ERROR,error: "error"})
        }
    }
}


export const clearItem = () => ({type: MovieTvPersonActionTypes.CLEAR_ITEM})

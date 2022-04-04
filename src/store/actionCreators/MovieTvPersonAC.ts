import {Dispatch} from "react";
import {movieAPI} from "../../API/indexAPI";
import {MovieTvPersonAction, MovieTvPersonActionTypes} from "../../types/MovieTvPersonT";


export const  fetchMovieTvPerson = (id:string) => {
    return async (dispatch: Dispatch<MovieTvPersonAction>) => {
        try {
            dispatch({type: MovieTvPersonActionTypes.FETCH_ITEM})
            const response = await movieAPI.getMovie(id)
            let title = response.data.original_title
            let description = response.data.overview

            setTimeout(() => {
                dispatch({type: MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS,title,description})
            },500)
        }catch (e) {
            dispatch({type: MovieTvPersonActionTypes.FETCH_ITEM_ERROR,payload: "error"})
        }
    }
}

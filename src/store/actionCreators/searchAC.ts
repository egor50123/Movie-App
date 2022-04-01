import {Dispatch} from "react";
import {FilmAction, FilmActionTypes} from "../../types/searchT";
import {filmsAPI} from "../../API/indexAPI";


export const  fetchSearchFilms = (text = "a") => {
    return async (dispatch: Dispatch<FilmAction>) => {
        try {
            dispatch({type: FilmActionTypes.FETCH_FILMS})
            const response = await filmsAPI.getSearchedFilms(text)
            setTimeout(() => {
                dispatch({type: FilmActionTypes.FETCH_FILMS_SUCCESS,payload: response.data.results})
            },500)
        }catch (e) {
            dispatch({type: FilmActionTypes.FETCH_FILMS_ERROR,payload: "error"})
        }
    }
}

export const clearSearch = () => ({type:FilmActionTypes.CLEAR_SEARCH})
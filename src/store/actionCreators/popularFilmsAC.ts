import {UserAction, UserActionTypes} from "../../types/filmsT";
import {Dispatch} from "react";
import {filmsAPI} from "../../API/indexAPI";

export const  fetchPopularFilms = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER})
            const response = await filmsAPI.getPopular()
            setTimeout(() => {
                dispatch({type: UserActionTypes.FETCH_USER_SUCCESS,payload: response.data.results})
            },500)
        }catch (e) {
            dispatch({type: UserActionTypes.FETCH_USER_ERROR,payload: "error"})
        }
    }
}

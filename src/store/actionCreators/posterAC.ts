import {Dispatch} from "react";
import {movieAPI} from "../../API/indexAPI";
import {PosterAction, PosterActionTypes} from "../types/posterT";
import {ESwitch} from "../../models/previewItem_SwitchM";

export const  fetchPosterItems = () => {
    return async (dispatch: Dispatch<PosterAction>) => {
        try {
            dispatch({type: PosterActionTypes.FETCH_POSTER})
            let response = await movieAPI.getMovies(ESwitch.popular);
            dispatch({type: PosterActionTypes.FETCH_POSTER_SUCCESS,payload: response.data.results})
        }
        catch (e) {
            dispatch({type: PosterActionTypes.FETCH_POSTER_ERROR,error: "error"})
        }
    }
}

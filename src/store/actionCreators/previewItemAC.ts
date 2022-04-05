import {Dispatch} from "react";
import {movieAPI, tvAPI} from "../../API/indexAPI";
import {PreviewAction, PreviewActionTypes} from "../../types/previewItemT";
import {AxiosResponse} from "axios";

type MovieTypes = "now_playing" | "popular" | "upcoming" | "top_rated"
type TvTypes = "popular" | "airing_today" | "on_the_air" | "top_rated"
//++

export const  fetchPreviewItems = (currentPreview:"Movies" | "Tv",switchType:MovieTypes | TvTypes) => {
    return async (dispatch: Dispatch<PreviewAction>) => {
        let time = currentPreview === "Movies" ? 500 : 1000
        let response = {} as AxiosResponse<any>
        try {
            dispatch({type: PreviewActionTypes.FETCH_PREVIEW,currentPreview})
            switch (currentPreview) {
                case "Movies": {
                    response = await movieAPI.getMovies(switchType as MovieTypes);
                    break;
                }
                case "Tv": {
                    response = await tvAPI.getTv(switchType as TvTypes);
                    break;
                }
                default:break
            }
            setTimeout(() => {
                dispatch({type: PreviewActionTypes.FETCH_PREVIEW_SUCCESS,payload: response.data.results,currentPreview})
            },time)
        }catch (e) {
            dispatch({type: PreviewActionTypes.FETCH_PREVIEW_ERROR,payload: "error",currentPreview})
        }
    }
}

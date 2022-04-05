import {Dispatch} from "react";
import {movieAPI, tvAPI} from "../../API/indexAPI";
import {PreviewAction, PreviewActionTypes} from "../../types/previewItemT";
import {AxiosResponse} from "axios";
import {EPreviewItems, MovieSwitchTypes, PreviewItemsTypes, TvSwitchTypes} from "../../models/previewItem_SwitchM";


export const  fetchPreviewItems = (currentPreview:PreviewItemsTypes,switchType:MovieSwitchTypes | TvSwitchTypes) => {
    return async (dispatch: Dispatch<PreviewAction>) => {
        let time = currentPreview === "Movies" ? 500 : 1000
        let response = {} as AxiosResponse<any>
        try {
            dispatch({type: PreviewActionTypes.FETCH_PREVIEW,currentPreview})
            switch (currentPreview) {
                case EPreviewItems.Movies: {
                    response = await movieAPI.getMovies(switchType as MovieSwitchTypes);
                    break;
                }
                case EPreviewItems.Tv: {
                    response = await tvAPI.getTv(switchType as TvSwitchTypes);
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

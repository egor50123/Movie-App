import {Dispatch} from "react";
import {movieAPI, trailersAPI, trendsAPI, tvAPI} from "../../API/indexAPI";
import {PreviewAction, PreviewActionTypes} from "../../types/previewItemT";
import {AxiosResponse} from "axios";
import {
    EPreviewItems,
    MovieSwitchTypes,
    PreviewItemsTypes, TrailersSwitchTypes,
    TrendsSwitchTypes,
    TvSwitchTypes
} from "../../models/previewItem_SwitchM";


export const  fetchPreviewItems = (currentPreview:PreviewItemsTypes,switchType:string) => {
    return async (dispatch: Dispatch<PreviewAction>) => {
        let time = 100
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
                case EPreviewItems.Trends:{
                    response = await trendsAPI.getTrends(switchType as TrendsSwitchTypes);
                    break;
                }
                case EPreviewItems.Trailers:{
                    response = await trailersAPI.getTrailers(switchType as TrailersSwitchTypes);
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

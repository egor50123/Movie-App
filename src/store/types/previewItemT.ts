import {PreviewItemsTypes} from "../../models/previewItem_SwitchM";
import {IMoviesTvsPayload} from "../../models/payloadAPI_M";

export interface previewState {
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: IMoviesTvsPayload | null,
        },
    }
}

export enum PreviewActionTypes {
    FETCH_PREVIEW = "FETCH_PREVIEW",
    FETCH_PREVIEW_SUCCESS = "FETCH_PREVIEW_SUCCESS",
    FETCH_PREVIEW_ERROR = "FETCH_PREVIEW_ERROR",
}

interface FetchPreviewAction {
    type: PreviewActionTypes.FETCH_PREVIEW,
    currentPreview: PreviewItemsTypes
}

interface FetchPreviewSuccessAction {
    type: PreviewActionTypes.FETCH_PREVIEW_SUCCESS,
    payload: IMoviesTvsPayload,
    currentPreview: PreviewItemsTypes
}

interface FetchPreviewErrorAction {
    type: PreviewActionTypes.FETCH_PREVIEW_ERROR,
    error:string
    currentPreview: PreviewItemsTypes
}



export type PreviewAction = FetchPreviewAction | FetchPreviewSuccessAction | FetchPreviewErrorAction
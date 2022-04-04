export interface previewState {
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: any[],
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
    currentPreview: "Movies" | "Tv"
}

interface FetchPreviewSuccessAction {
    type: PreviewActionTypes.FETCH_PREVIEW_SUCCESS,
    payload: any[],
    currentPreview: "Movies" | "Tv"
}

interface FetchPreviewErrorAction {
    type: PreviewActionTypes.FETCH_PREVIEW_ERROR,
    payload: string,
    currentPreview: string
}



export type PreviewAction = FetchPreviewAction | FetchPreviewSuccessAction | FetchPreviewErrorAction
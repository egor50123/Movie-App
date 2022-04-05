import {PreviewAction, PreviewActionTypes, previewState} from "../../types/previewItemT";

const init: previewState = {
    previews: {},
}

export const previewItemReducer = (state = init, action: PreviewAction): previewState => {
    switch (action.type) {
        case PreviewActionTypes.FETCH_PREVIEW:
            return {
                ...state,
                previews: {
                    ...state.previews,
                    [action.currentPreview]: {
                        isLoading: true,
                        error: null,
                        payload: [],
                    }
                }
            }
        case PreviewActionTypes.FETCH_PREVIEW_SUCCESS:
            return {
                ...state,
                previews: {
                    ...state.previews,
                    [action.currentPreview]: {
                        isLoading: false,
                        error: null,
                        payload: action.payload,
                    }
                }
            }
        case PreviewActionTypes.FETCH_PREVIEW_ERROR:
            return {
                ...state,
                previews: {
                    ...state.previews,
                    [action.currentPreview]: {
                        isLoading: false,
                        error: "null",
                        payload: [],
                    }
                }
            }
        default:
            return state
    }
}
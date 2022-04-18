import {PreviewItemsTypes} from "../../models/previewItem_SwitchM";
import {TGenresPayload} from "../../models/payloadAPI_M";

export interface ISwitchCurrent {
    [key:string]:number
}

export interface MainPageState {
    switchType: {
        [key:string]: number
    },
    genres: {
        isLoading: boolean,
        error: string | null,
        payload:null | TGenresPayload
    }
}

export enum MainPageActionTypes {
    SET_SWITCH = "SET_SWITCH",
    FETCH_GENRES = "FETCH_GENRES",
    FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS",
    FETCH_GENRES_ERROR = "FETCH_GENRES_ERROR"
}

interface SetSwitchAction {
    type: MainPageActionTypes.SET_SWITCH,
    id: number,
    currentSwitch: PreviewItemsTypes
}

interface FetchGenresAction {
    type: MainPageActionTypes.FETCH_GENRES
}

interface FetchGenresSuccessAction {
    type: MainPageActionTypes.FETCH_GENRES_SUCCESS,
    payload:null | TGenresPayload
}

interface FetchGenresErrorAction {
    type: MainPageActionTypes.FETCH_GENRES_ERROR
    error:string
}

export type MainPageActions = SetSwitchAction | FetchGenresAction | FetchGenresSuccessAction | FetchGenresErrorAction
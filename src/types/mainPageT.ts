import {EPreviewItems, PreviewItemsTypes} from "../models/previewItem_SwitchM";

export interface MainPageState {
    switchType:{
        [EPreviewItems.Movies]:number,
        [EPreviewItems.Tv]:number
    }
}

export enum MainPageTypes {
    SET_SWITCH = "SET_SWITCH",
}

interface SetSwitchAction {
    type: MainPageTypes.SET_SWITCH,
    id: number,
    currentSwitch: PreviewItemsTypes

}

export type MainPageAction = SetSwitchAction
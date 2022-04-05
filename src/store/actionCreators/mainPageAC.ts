import {MainPageTypes} from "../../types/mainPageT";
import {PreviewItemsTypes} from "../../models/previewItem_SwitchM";

export const setCurrentSwitch = (id:number,currentSwitch:PreviewItemsTypes) => ({type:MainPageTypes.SET_SWITCH,currentSwitch,id})
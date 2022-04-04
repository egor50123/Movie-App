import {MainPageTypes} from "../../types/mainPageT";

type SwitchTypes = "Movies" | "Tv"

export const setCurrentSwitch = (id:number,currentSwitch:SwitchTypes) => ({type:MainPageTypes.SET_SWITCH,currentSwitch,id})
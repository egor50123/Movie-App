export interface MainPageState {
    switchType:{
        Movies:number,
        Tv:number
    }
}

export enum MainPageTypes {
    SET_SWITCH = "SET_SWITCH",
}

interface SetSwitchAction {
    type: MainPageTypes.SET_SWITCH,
    id: number,
    currentSwitch:"Movie" | "Tv"

}

export type MainPageAction = SetSwitchAction
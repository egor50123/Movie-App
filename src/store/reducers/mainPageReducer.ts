import {MainPageAction, MainPageState, MainPageTypes} from "../../types/mainPageT";

const init = {
    switchType: {}
}

export const mainPageReducer = (state = init, action:MainPageAction):MainPageState => {
    switch (action.type) {
        case MainPageTypes.SET_SWITCH:
            return {
                ...state,
                switchType: {
                    ...state.switchType,
                    [action.currentSwitch]: action.id
                }
            }
        default: return state
    }
}
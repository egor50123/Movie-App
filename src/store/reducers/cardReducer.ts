import {cardActions, cardActionTypes, cardState} from "../types/card";

const init: cardState = {
    deleteCardId: [],
    openListId: null
}

export const cardReducer = (state = init, action: cardActions): cardState => {
    switch (action.type) {
        case cardActionTypes.DELETE_CARD: {
            return {
                ...state,
                deleteCardId: [...state.deleteCardId,action.id]
            }
        }
        case cardActionTypes.CLEAR_DELETE_CARD__IDS: {
            return {
                ...state,
                deleteCardId: []
            }
        }
        case cardActionTypes.UPDATE_OPEN_LIST_ID: {
            return {
                ...state,
                openListId: action.id
            }
        }
        default:
            return state
    }
}
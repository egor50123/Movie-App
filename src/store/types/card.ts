export interface cardState {
    deleteCardId: number[],
    openListId: number | null
}

export enum cardActionTypes {
    DELETE_CARD = "DELETE_CARD",
    CLEAR_DELETE_CARD__IDS = "CLEAR_DELETE_CARD__IDS",
    UPDATE_OPEN_LIST_ID = "UPDATE_OPEN_LIST_ID"
}

interface DeleteCard {
    type: cardActionTypes.DELETE_CARD,
    id: number
}

interface updateOpenListId {
    type: cardActionTypes.UPDATE_OPEN_LIST_ID,
    id: number
}

interface clearDeleteCardIds {
    type: cardActionTypes.CLEAR_DELETE_CARD__IDS,
}

export type cardActions = DeleteCard | clearDeleteCardIds | updateOpenListId
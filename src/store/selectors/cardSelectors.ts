import {RootState} from "../index";

export const deleteId = (state:RootState) => state.card.deleteCardId
export const updateOpenListId = (state:RootState) => state.card.openListId

//import * as authSelectors from "../../store/selectors/authSelecors"
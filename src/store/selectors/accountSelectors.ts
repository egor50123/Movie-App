import {RootState} from "../index";

export const createdListLoading = (state:RootState) => state.account.createdList.isLoading
export const createdLists = (state:RootState) => state.account.createdList.payload?.results
//import * as authSelectors from "../../store/selectors/authSelecors"
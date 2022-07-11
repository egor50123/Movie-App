import {RootState} from "../index";

export const createdListLoading = (state:RootState) => state.account.createdList.isLoading
export const createdLists = (state:RootState) => state.account.createdList.payload?.results
export const commonList = (state:RootState) => state.account.list.payload?.results
export const accountId = (state:RootState) =>  state.account.details.payload?.id
//import * as authSelectors from "../../store/selectors/authSelecors"
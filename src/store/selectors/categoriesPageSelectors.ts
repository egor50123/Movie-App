import {RootState} from "../index";

export const categoriesFilter = (state:RootState) => state.categoriesFilter.settings
export const payload = (state:RootState) => state.categories.payloadResults
export const isLoading = (state:RootState) => state.categories.isLoading
export const nextPage = (state:RootState) => state.categories.nextPage


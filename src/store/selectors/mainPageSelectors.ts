import {genreTypes} from "../types/mainPageT";
import {RootState} from "../index";


export const genresTv = (state:RootState) => state.mainPage[genreTypes.genresTv].payload
export const genresMovie = (state:RootState) => state.mainPage[genreTypes.genresMovie].payload
export const currentSwitch = (state:RootState) => state.mainPage.switchType
export const getSearch = (state:RootState) => state.search
export const previewsPayload = (state:RootState) => state.previewItem.previews
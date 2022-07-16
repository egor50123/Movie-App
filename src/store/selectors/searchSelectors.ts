import {RootState} from "../index";
import {MTP_TYPES} from "../../constants/constants";

export const payloadMovie = (state:RootState) => state.searchPage.movie.payload
export const payloadTv = (state:RootState) => state.searchPage.movie.payload
export const results = (state:RootState, current:MTP_TYPES) =>  state.searchPage[current].payload?.results
export const payload = (state:RootState, current:MTP_TYPES) =>  state.searchPage[current].payload
export const text = (state:RootState) =>  state.search.text
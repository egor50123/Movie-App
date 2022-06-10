import {genreTypes} from "../types/mainPageT";
import {RootState} from "../index";

export const moviesGenres = (state:RootState) => state.mainPage[genreTypes.genresMovie].payload
export const tvsGenres = (state:RootState) => state.mainPage[genreTypes.genresTv].payload
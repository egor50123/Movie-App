import {genreTypes} from "../types/mainPageT";
import {RootState} from "../index";

export const moviesGenres = (state:RootState) => state.mainPage[genreTypes.genresMovie].payload
export const tvsGenres = (state:RootState) => state.mainPage[genreTypes.genresTv].payload
export const searchValue = (state:RootState) => state.search.lastValue
export const searchPage = (state:RootState) => state.searchPage
export const movieTvItem = (state:RootState) => state.movieTvPerson.payload
export const movieTvLoading = (state:RootState) => state.movieTvPerson.isLoading
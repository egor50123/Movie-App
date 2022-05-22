import {Dispatch} from "react";
import {searchAPI} from "../../API/indexAPI";
import {SearchAction, SearchActionTypes} from "../types/searchT";
import {AxiosResponse} from "axios";


export const  fetchSearch = (text:string,type:string) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        try {
            dispatch({type: SearchActionTypes.FETCH_SEARCH})
            let response:null | AxiosResponse = null

            if(type === "multi") {
                response = await searchAPI.getSearchedMulti(text)
            } else if (type === "movie")  {
                response = await searchAPI.getSearchedMovie(text)
            } else if (type === "tv")  {
                response = await searchAPI.getSearchedTv(text)
            } else if (type === "person")  {
                response = await searchAPI.getSearchedPerson(text)
            }
            else {
                response = await searchAPI.getSearchedMovie(text)
                if (response && response.data.total_results === 0) response = await searchAPI.getSearchedTv(text)
                if (response && response.data.total_results === 0) response = await searchAPI.getSearchedPerson(text)
            }
            setTimeout(() => {
                dispatch({type: SearchActionTypes.FETCH_SEARCH_SUCCESS,payload: (response as AxiosResponse).data, text})
            },500)
        }catch (e) {
            dispatch({type: SearchActionTypes.FETCH_SEARCH_ERROR,payload: "error"})
        }
    }
}

export const clearSearch = () => ({type:SearchActionTypes.CLEAR_SEARCH})
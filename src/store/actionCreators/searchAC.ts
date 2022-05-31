import {Dispatch} from "react";
import {searchAPI} from "../../API/indexAPI";
import {SearchAction, SearchActionTypes} from "../types/searchT";
import {AxiosResponse} from "axios";


export const  fetchSearch = (text:string) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        try {
            dispatch({type: SearchActionTypes.FETCH_SEARCH})
            let response:AxiosResponse = await searchAPI.getSearchedMulti(text)

            if (response.data.results.length === 0) {
                throw new Error("error")
            }
            setTimeout(() => {
                dispatch({type: SearchActionTypes.FETCH_SEARCH_SUCCESS,payload: (response as AxiosResponse).data, text})
            },500)
        }catch (e) {
            dispatch({type: SearchActionTypes.FETCH_SEARCH_ERROR,payload: true})
        }
    }
}

export const clearSearch = () => ({type:SearchActionTypes.CLEAR_SEARCH})
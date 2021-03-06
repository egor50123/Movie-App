import {Dispatch} from "react";
import {searchAPI} from "../../API/indexAPI";
import {SearchActionTypes} from "../types/searchT";
import {AxiosResponse} from "axios";
import {MTP, MTP_TYPES} from "../../constants/constants";
import {SearchPageActions, SearchPageActionTypes} from "../types/searchPageT";


export const  fetchItemSearchPage = (text:string,type:MTP_TYPES,page:number = 1) => {
    return async (dispatch: Dispatch<SearchPageActions>) => {
        try {
            //dispatch({type: SearchPageActionTypes.FETCH_SEARCH})
            let response:null | AxiosResponse = null

            if (type === MTP.movie)  {
                response = await searchAPI.getSearchedMovie(text,page)
            } else if (type === MTP.tv)  {
                response = await searchAPI.getSearchedTv(text,page)
            } else if (type === MTP.person)  {
                response = await searchAPI.getSearchedPerson(text)
            }
            if (response?.data.results.length === 0) {
                throw new Error("error")
            }
            console.log(response)
            dispatch({type: SearchPageActionTypes.FETCH_SEARCH_ITEMS_SUCCESS,payload: (response as AxiosResponse).data, text, currentType:type})

        }catch (e) {
            dispatch({type: SearchPageActionTypes.FETCH_SEARCH_ITEMS_ERROR,currentType:type,payload: true})
        }
    }
}

export const clearSearch = () => ({type:SearchActionTypes.CLEAR_SEARCH})
export const clearSearchPage = () => ({type:SearchPageActionTypes.CLEAR_SEARCH_PAGE})
export const saveLastValue = (text:string) => ({type:SearchActionTypes.SAVE_LAST_VALUE, text})
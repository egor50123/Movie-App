import {
    MovieTvPerson,
    MovieTvPersonAction,
    MovieTvPersonActionTypes
} from "../../types/MovieTvPersonT";


const init: MovieTvPerson = {
    title: "",
    description: "",
    isLoading: false,
    error: null
}

export const movieTvPersonReducer = (state = init,action:MovieTvPersonAction):MovieTvPerson => {
    switch (action.type) {
        case MovieTvPersonActionTypes.FETCH_ITEM:
            return {...state,isLoading:true,error:null}
        case MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS:
            return {isLoading:false,error:null,title:action.title,description:action.description}
        case MovieTvPersonActionTypes.FETCH_ITEM_ERROR:
            return {isLoading:false,error:action.payload,title: "",description: ""}
        default: return state
    }
}
import {
    MovieTvPerson,
    MovieTvPersonAction,
    MovieTvPersonActionTypes
} from "../../types/MovieTvPersonT";


const init: MovieTvPerson = {
    payload:{
        overview:"",
        poster_path:"",
        backdrop_path:"",
        genres: null,
        original_title:"",
        vote_average:"",
        vote_count:"",
        release_date:"",
        title:"",
        videos:null,
        runtime: 0,
        homepage:"",
        belongs_to_collection: null
    },
    isLoading: false,
    error: null,
    isLoadingPeople:false,
    errorPeople:null,
    people:null,
}

export const movieTvPersonReducer = (state = init,action:MovieTvPersonAction):MovieTvPerson => {
    switch (action.type) {
        case MovieTvPersonActionTypes.FETCH_ITEM:
            return {...state,isLoading:true,error:null}
        case MovieTvPersonActionTypes.FETCH_ITEM_SUCCESS:
            return {...state,isLoading:false,error:null,payload:action.payload}
        case MovieTvPersonActionTypes.FETCH_ITEM_ERROR:
            return {...state,isLoading:false,error:"error"}
        case MovieTvPersonActionTypes.CLEAR_ITEM:
            return {...state}
        case MovieTvPersonActionTypes.FETCH_PEOPLE:
            return {...state,isLoadingPeople:true}
        case MovieTvPersonActionTypes.FETCH_PEOPLE_SUCCESS:
            return {...state,isLoadingPeople:false, people: action.people}
        case MovieTvPersonActionTypes.FETCH_PEOPLE_ERROR:
            return {...state,isLoadingPeople:false,errorPeople:action.errorPeople}
        default: return state
    }
}
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {popularReducer} from "./reducers/popularReducer";
import {searchReducer} from "./reducers/searchReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {movieTvPersonReducer} from "./reducers/MovieTvPerson";

const  reducer = combineReducers(
    {
        user: popularReducer,
        search: searchReducer,
        movieTvPerson: movieTvPersonReducer
    }
)
export type RootState = ReturnType<typeof reducer>
export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))


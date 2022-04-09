import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {searchReducer} from "./reducers/searchReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {movieTvPersonReducer} from "./reducers/MovieTvPerson";
import {mainPageReducer} from "./reducers/mainPageReducer";
import {previewItemReducer} from "./reducers/previewItemReducer";
import {posterReducer} from "./reducers/posterReducer";

const  reducer = combineReducers(
    {
        search: searchReducer,
        movieTvPerson: movieTvPersonReducer,
        mainPage: mainPageReducer,
        previewItem: previewItemReducer,
        poster: posterReducer
    }
)
export type RootState = ReturnType<typeof reducer>
export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))


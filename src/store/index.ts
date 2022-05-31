import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {searchReducer} from "./reducers/searchReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {movieTvPersonReducer} from "./reducers/MovieTvPersonReducer";
import {mainPageReducer} from "./reducers/mainPageReducer";
import {previewItemReducer} from "./reducers/previewItemReducer";
import {posterReducer} from "./reducers/posterReducer";
import {categoriesReducer} from "./reducers/categoriesReducer";
import {authReducer} from "./reducers/authReducer";
import {accountReducer} from "./reducers/accountReducer";
import {searchPageReducer} from "./reducers/searchPageReducer";

const  reducer = combineReducers(
    {
        search: searchReducer,
        movieTvPerson: movieTvPersonReducer,
        mainPage: mainPageReducer,
        previewItem: previewItemReducer,
        poster: posterReducer,
        categories: categoriesReducer,
        auth: authReducer,
        account: accountReducer,
        searchPage: searchPageReducer
    }
)
export type RootState = ReturnType<typeof reducer>
export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))


import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {popularReducer} from "./reducers/popularReducer";
import {searchReducer} from "./reducers/searchReducer";
import {composeWithDevTools} from "@redux-devtools/extension";

const  reducer = combineReducers(
    {
        user: popularReducer,
        search: searchReducer
    }
)
export type RootState = ReturnType<typeof reducer>
export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))


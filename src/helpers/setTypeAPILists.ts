import {TListAPIParamType} from "../models/ProfileM";

export const setTypeAPILists = (currentList:string | undefined) => {
    let typeAPI:TListAPIParamType = "favorite"
    switch (currentList) {
        case "favorites":
            typeAPI = "favorite";
            break;
        case "ratings":
            typeAPI = "rated";
            break;
        case "watchlist":
            typeAPI = "watchlist";
            break;
        default: typeAPI = "favorite";break;
    }
    return typeAPI
}
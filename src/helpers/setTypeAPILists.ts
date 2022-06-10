import {ListAPIParam, TListAPIParamType} from "../models/ProfileM";

export const setTypeAPILists = (currentList:string | undefined) => {
    let typeAPI:TListAPIParamType = ListAPIParam.favorite
    switch (currentList) {
        case "favorites":
            typeAPI = ListAPIParam.favorite;
            break;
        case "ratings":
            typeAPI = ListAPIParam.rated;
            break;
        case "watchlist":
            typeAPI = ListAPIParam.watchlist;
            break;
        default: typeAPI = ListAPIParam.favorite;break;
    }
    return typeAPI
}
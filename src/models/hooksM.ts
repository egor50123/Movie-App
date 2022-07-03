import {MT_TYPES} from "../constants/constants";
import {IListBtnCurrentList} from "../components/Common/Buttons/ListBtn";

export interface IUseFavorite {
    itemId:number,
    isFavorite:boolean,
}

export interface IUseWatchList {
    itemId:number,
    isToWatchList:boolean,
}

export interface IRate {
    type: MT_TYPES,
    rate: number,
    itemId: number,
}

export interface IList {
    type: MT_TYPES,
    itemId: number,
    listData: IListBtnCurrentList
}
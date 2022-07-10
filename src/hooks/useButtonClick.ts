import React, {useState} from 'react';
import {useAccountBtns} from "./useAccountBtns";
import {accountBtnsTypes, MTP_TYPES} from "../constants/constants";
import {useLocation} from "react-router-dom";
import {ProfileLinksNames} from "../models/ProfileM";
import {useAction} from "./useAction";

interface ICommon {
    e?:React.MouseEvent<Element, MouseEvent>,

}
interface commonWithItemId extends ICommon {
    itemId:number
}

interface commonWithItemType extends commonWithItemId {
    type: MTP_TYPES
}

const useButtonClick = (btnType:string) => {
    const {setFavorite,setWatchList,getMyCreatedList,ratingDelete} = useAccountBtns()
    const {updateListId} = useAction()
    const [isRateMenu,setRateMenu] = useState(false)
    const [isListMenu, setListMenu] = useState(false)

    const href = useLocation()

    function onRate ({e,itemId}:commonWithItemId) {
        e?.preventDefault()
        updateListId(itemId)
        setRateMenu(prev => !prev)
    }

    function onFavourite ({e,itemId}:commonWithItemId)  {
        e?.preventDefault()
        setFavorite({itemId, isFavorite: true})
    }

    function onWatchList ({e,itemId}:commonWithItemId) {
        e?.preventDefault()
        setWatchList({itemId, isToWatchList: true})
    }

    function onList ({e,itemId}:commonWithItemId) {
        setListMenu(prev => !prev)
        updateListId(itemId)
        getMyCreatedList()
    }

    function onDelete ({itemId,type}:commonWithItemType) {
        switch (true) {
            case href.pathname.includes(ProfileLinksNames.favorites): setFavorite({itemId, isFavorite: true});break;
            case href.pathname.includes(ProfileLinksNames.watchlist): setWatchList({itemId, isToWatchList: true});break;
            case href.pathname.includes(ProfileLinksNames.ratings): ratingDelete({itemId,type});break;
        }
    }

    switch (btnType) {
        case accountBtnsTypes.rate: {
            return [isRateMenu,onRate] as const
        }
        case accountBtnsTypes.favourite: {
            return [null, onFavourite] as const
        }
        case accountBtnsTypes.watchList: {
            return [null,onWatchList] as const
        }
        case accountBtnsTypes.list: {
            return [isListMenu,onList] as const
        }
        case accountBtnsTypes.delete: {
            return [null,onDelete] as const
        }
        default: return [false, null] as const
    }
};

export default useButtonClick;
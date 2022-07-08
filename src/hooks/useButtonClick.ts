import React, {useState} from 'react';
import {useAccountBtns} from "./useAccountBtns";
import {accountBtnsTypes} from "../constants/constants";

interface ICommon {
    e:React.MouseEvent<Element, MouseEvent>,

}

interface commonWithItemId extends ICommon {
    itemId:number
}

const useButtonClick = (btnType:string) => {
    const {setFavorite,setWatchList,setRate,getMyCreatedList,addToList} = useAccountBtns()

    const [isRateMenu,setRateMenu] = useState(false)
    const [isListMenu, setListMenu] = useState(false)

    function onRate ({e}:ICommon) {
        e.preventDefault()
        setRateMenu(prev => !prev)
    }

    function onFavourite ({e,itemId}:commonWithItemId)  {
        e.preventDefault()
        //deleteOrSaveCard(ProfileLinksNames.favorites)
        setFavorite({itemId, isFavorite: true})
    }

    function onWatchList ({e,itemId}:commonWithItemId) {
        e.preventDefault()
        //deleteOrSaveCard(ProfileLinksNames.watchlist)
        setWatchList({itemId, isToWatchList: true})
    }

    function onList ({e,itemId}:commonWithItemId) {
        setListMenu(prev => !prev)
        getMyCreatedList()
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
        default: return [false, onRate] as const
    }

    return [null, () => alert("что-то  пошло не так")] as const;
};

export default useButtonClick;
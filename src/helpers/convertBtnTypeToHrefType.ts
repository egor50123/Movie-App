import {accountBtnsTypes} from "../constants/constants";
import {ProfileLinksNames} from "../models/ProfileM";

export const convertBtnTypeToHrefType = (btnType:string,href:string) => {
    switch (btnType) {
        case accountBtnsTypes.rate: return href.includes(ProfileLinksNames.ratings)
        case accountBtnsTypes.watchList: return href.includes(ProfileLinksNames.watchlist)
        case accountBtnsTypes.favourite: return href.includes(ProfileLinksNames.favorites)
    }
    return false

}
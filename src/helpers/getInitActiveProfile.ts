import {ProfileLinksNames} from "../models/ProfileM";

export const getInitActiveProfile = (current:string | undefined) => {
    let activeId = 1
    switch (current) {
        case undefined: activeId = 1;break;
        case ProfileLinksNames.watchlist: activeId = 2;break;
        case ProfileLinksNames.ratings: activeId = 3;break;
        case ProfileLinksNames.favorites: activeId = 4;break;
        default: activeId = 1;
    }
    return activeId
}
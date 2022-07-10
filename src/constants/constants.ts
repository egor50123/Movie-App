import {ESwitch} from "../models/previewItem_SwitchM";

export const moviesSwitchTitles = [[ESwitch.now_playing,"Смотрят сейчас"],
    [ESwitch.popular,"Популярное"],
    [ESwitch.upcoming,"Ожидаемые"],
    [ESwitch.top_rated,"Лучшие"]
]

export const tvSwitchTitles = [[ESwitch.popular,"Смотрят сейчас"],
    [ESwitch.airing_today,"Популярное"],
    [ESwitch.on_the_air,"Ожидаемые"],
    [ESwitch.top_rated,"Лучшие"]
]

export const trendsSwitchTitles = [[ESwitch.day,"Сегодня"],
    [ESwitch.week,"На этой неделе"]
]

export enum MTP {
    movie = "movie",
    tv = "tv",
    person = "person"
}

export type MTP_TYPES = MTP.tv | MTP.movie | MTP.person

export type MT_TYPES = MTP.tv | MTP.movie

export enum accountBtnsTypes {
    favourite = "favourite",
    list = "list",
    rate = "rate",
    watchList = "watchList",
    delete = "delete"
}


export enum buttonsSize {
    small = "small",
    medium = "medium",
    large = "large"
}

export enum tooltipPlacementC {
    left = "left",
    bottom = "bottom",
    top = "top"
}

export enum ESwitch {
    now_playing = "now_playing",
    popular = "popular",
    upcoming= "upcoming",
    top_rated = "top_rated",
    airing_today = "airing_today",
    on_the_air = "on_the_air",
    day = "day",
    week = "week",
    movie = "movie",
    tv = "tv"
}
export const marksForRateSlider = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 10,
        label: '10',
    },
];

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

export enum EPreviewItems {
    Movies = "Movies",
    Tv = "Tv",
    Trailers= "Trailers",
    Trends = "Trends",
}



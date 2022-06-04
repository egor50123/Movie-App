export interface categoriesFilterState {
    settings: {
        withGenres: string,
        minYear: string,
        maxYear: string,
        minRank: string,
        maxRank: string,
        minRuntime: string,
        maxRuntime: string,
        sortType: string
    }
}

export enum categoriesFilterAC {
    UPDATE_FILTER = "UPDATE_FILTER",
    RESET_FILTER = "RESET_FILTER"
}

interface updateFilterAction {
    type: categoriesFilterAC.UPDATE_FILTER
    settings: {}
}

interface resetFilter {
    type: categoriesFilterAC.RESET_FILTER
}

export type categoriesFilterAction = updateFilterAction | resetFilter
export enum filterDataNames {
    dateFilter = "dateFilter",
    genresFilter = "genresFilter",
    rateFilter = "rateFilter",
    sortFilter = "sortFilter"
}

export type filterT = filterDataNames.rateFilter | filterDataNames.sortFilter | filterDataNames.dateFilter | filterDataNames.genresFilter

export interface filterData {
    [filterDataNames.dateFilter]?: string,
    [filterDataNames.genresFilter]?: string | object
    [filterDataNames.rateFilter]?:string,
    [filterDataNames.sortFilter]?:string
}
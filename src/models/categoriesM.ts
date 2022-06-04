import {MTP_TYPES} from "../constants/constants";

export enum CategoriesSortTypes {
    popularityDown = "popularity.desc",
    popularityUp = "popularity.asc",
    releaseDown = "primary_release_date.desc",
    releaseUp = "primary_release_date.asc",
    voteAverageDown = "vote_average.desc",
    voteAverageUp = "vote_average.asc",
}

export enum FilterRangeNames {
    minYear = "minYear",
    maxYear = "maxYear",
    minRank = "minRank",
    maxRank = "maxRank",
    minRuntime = "minRuntime",
    maxRuntime = "maxRuntime"
}

export interface IFilterSettings {
    type: MTP_TYPES,
    [FilterRangeNames.minYear]?:string,
    [FilterRangeNames.maxYear]?:string,
    [FilterRangeNames.minRank]?:string,
    [FilterRangeNames.maxRank]?:string,
    [FilterRangeNames.minRuntime]?:string,
    [FilterRangeNames.maxRuntime]?:string,
    sortType?: string,
    withReleaseType?: string,
    withGenres: string,
    page?:number,
}

export interface ICheckbox {
    [key: string]: boolean
}

export interface ICategoriesPage {
    type: MTP_TYPES
}

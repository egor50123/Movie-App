import {filterData, filterDataNames} from "../models/filterM";

interface settings {
    withGenres?: string,
    minYear?: string,
    maxYear?: string,
    minRank?: string,
    maxRank?: string,
    sortType?: string
}

export const setSettings = (settings:filterData) => {
    let newSettings:settings = {}
    for (let entries of Object.entries(settings)) {
        switch (entries[0]) {
            case filterDataNames.dateFilter: {
                let [min,max] = entries[1].split(",")
                newSettings.minYear = min;
                newSettings.maxYear = max
            }break;
            case filterDataNames.genresFilter: {
                let genresObj  = JSON.parse(entries[1])
                let genresStr = ""
                for (let [name, value] of Object.entries(genresObj)) {
                    if (value) {
                        genresStr += name + "|"
                    }
                }
                newSettings.withGenres = genresStr.slice(0,-1)
            }break;
            case filterDataNames.sortFilter: {
                newSettings.sortType = entries[1]
            }break;
            case filterDataNames.rateFilter: {
                let [min,max] = entries[1].split(",")
                newSettings.minRank = min;
                newSettings.maxRank = max
            }
        }
    }

    return newSettings
}
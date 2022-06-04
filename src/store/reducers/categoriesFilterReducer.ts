import {categoriesFilterAC, categoriesFilterAction, categoriesFilterState} from "../types/categoriesFilterT";
import {CategoriesSortTypes} from "../../models/categoriesM";

const init: categoriesFilterState = {
    settings: {
        withGenres: "",
        minYear: "",
        maxYear: "",
        minRank: "",
        maxRank: "",
        minRuntime: "",
        maxRuntime: "",
        sortType: `${CategoriesSortTypes.popularityDown}`
    }
}

export const categoriesFilterReducer = (state = init, action: categoriesFilterAction): categoriesFilterState => {
    switch (action.type) {
        case categoriesFilterAC.UPDATE_FILTER:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.settings
                }
            }
        case categoriesFilterAC.RESET_FILTER: {
            return {
                settings: init.settings
            }
        }

        default: return state
    }
}

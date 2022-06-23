import {categoriesFilterAC, categoriesFilterAction, categoriesFilterState} from "../types/categoriesFilterT";
import {CategoriesSortTypes} from "../../models/categoriesM";
import {setSettings} from "../../helpers/setSettings";

const init: categoriesFilterState = {
    settings: {
        withGenres: "",
        minYear: "",
        maxYear: "",
        minRank: "",
        maxRank: "",
        sortType: `${CategoriesSortTypes.popularityDown}`
    }
}

export const categoriesFilterReducer = (state = init, action: categoriesFilterAction): categoriesFilterState => {
    switch (action.type) {
        case categoriesFilterAC.UPDATE_FILTER:
            let newSettings = setSettings(action.settings)
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...newSettings
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

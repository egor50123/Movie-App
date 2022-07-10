import * as SearchAC from "./searchAC"
import * as ItemAc from "./MovieTvPersonAC"
import * as MainPageAC from "./mainPageAC"
import * as PreviewAC from "./previewItemAC"
import * as PosterAC from "./posterAC"
import * as Categories from "./categoriesAC"
import * as Auth from "./authAC"
import * as AccountAC from "./accountAC"
import * as SearchPageAC from "./searchPageAC"
import * as CategoriesFilter from "./categoriesFilterAC"
import * as CardAC from "./cardAC"

export default {
    ...SearchAC,
    ...ItemAc,
    ...MainPageAC,
    ...PreviewAC,
    ...PosterAC,
    ...Categories,
    ...Auth,
    ...AccountAC,
    ...SearchPageAC,
    ...CategoriesFilter,
    ...CardAC,
}
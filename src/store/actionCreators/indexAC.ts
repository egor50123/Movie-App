import * as SearchAC from "./searchAC"
import * as ItemAc from "./MovieTvPersonAC"
import * as MainPageAC from "./mainPageAC"
import * as PreviewAC from "./previewItemAC"
import * as PosterAC from "./posterAC"

export default {
    ...SearchAC,
    ...ItemAc,
    ...MainPageAC,
    ...PreviewAC,
    ...PosterAC,
}
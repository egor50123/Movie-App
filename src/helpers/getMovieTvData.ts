import {MTP_TYPES} from "../constants/constants";
import {IMoviePayload, ITvPayload} from "../models/payloadAPI_M";

interface I {
    type:MTP_TYPES,
    moviePayload: IMoviePayload,
    tvPayload: ITvPayload
}

export const getMovieTvData = ({type,moviePayload,tvPayload}:I) => {
    const title = type === "movie" ?
        moviePayload && moviePayload.title :
        tvPayload && tvPayload.name

    const releaseDate = type === "movie" ?
        moviePayload && moviePayload.release_date :
        tvPayload && tvPayload.first_air_date

    const runtime = type === "movie" ?
        moviePayload && moviePayload.runtime :
        "40m"


    const genres = type === "movie" ?
        // @ts-ignore
        moviePayload && `${moviePayload?.genres[0] && moviePayload?.genres[0].name}, ${moviePayload?.genres[1] && moviePayload?.genres[1].name}` :
        // @ts-ignore
        tvPayload && `${tvPayload?.genres[0] && tvPayload?.genres[0].name}, ${tvPayload?.genres[1] && tvPayload?.genres[1].name}`

    return {title,releaseDate,runtime,genres}
}
export const getMovieTvData = ({type,moviePayload,tvPayload}:any) => {
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
        `${moviePayload?.genres[0] && moviePayload?.genres[0].name}, ${moviePayload?.genres[1] && moviePayload?.genres[1].name}` :
        `${tvPayload?.genres[0] && tvPayload?.genres[0].name}, ${tvPayload?.genres[1] && tvPayload?.genres[1].name}`

    return {title,releaseDate,runtime,genres}
}
import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import "./movieTvItem.scss"
import {YOUTUBE_URL} from "../../../API/indexAPI";
import {IMoviePayload, IPeoplePayload, ISimilarMoviesPayload, ITvPayload} from "../../../models/payloadAPI_M";
import {useFavorite} from "../../../hooks/useFavorite";

export type MovieTvItemType = "tv" | "movie"

interface IMovieTvItem {
    [key:string]: MovieTvItemType
}


const MovieTvItem:FC<IMovieTvItem> = ({type}) => {
    let params = useParams()
    let {fetchItem,clearItem,fetchPeople,fetchSimilar} = useAction()
    let addFavorite = useFavorite()

    let movieTvPayload:IMoviePayload | ITvPayload | null = useTypedSelector(state => state.movieTvPerson.payload),
        peoplePayload:IPeoplePayload | null = useTypedSelector(state => state.movieTvPerson.people.payload),
        similarPayload:ISimilarMoviesPayload | null = useTypedSelector(state => state.movieTvPerson.similar.payload);


    let moviePayload:IMoviePayload | null= movieTvPayload as IMoviePayload,
        tvPayload:ITvPayload | null = movieTvPayload as ITvPayload;

    let id:string | undefined =  params.movieId

    switch (type) {
        case "movie": id = params.movieId;break;
        case "tv": id = params.tvId;break;
        default: break;
        //редирект страница не найдена
    }


    useEffect(() => {
        window.scrollTo(0,0)
        if (id !== undefined) {
            fetchItem(id,type)
            fetchPeople(id,type)
            fetchSimilar(id)
        }
        return () => {clearItem()}
    },[id])

    function onFavorite(itemId:number | undefined,isFavorite:boolean) {
        if (itemId) addFavorite({itemId, isFavorite})
    }

    function getFavorite () {}


    return (
        <div className={"movieTvItem container"}>
            <div className={"movieTvItem__pre"}>
                <span>тип</span><br/>
                <span>{movieTvPayload && movieTvPayload.genres[0].name}</span>
            </div>
            <div className={"movieTvItem__main"}>
                <div className={"movieTvItem__preview"}>
                    <div className={"movieTvItem__trailer"}>
                        {movieTvPayload && movieTvPayload.videos?.results[0] && <iframe src={`${YOUTUBE_URL}${movieTvPayload.videos.results[0].key}`}
                                                                  title={movieTvPayload.videos.results[0].name} allowFullScreen/>}
                    </div>
                    <div className={"movieTvItem__trailer-btns"}>
                        <button>добавить в список</button>
                        <button onClick={() => onFavorite(movieTvPayload?.id,true)}>избранное</button>
                        <button>закладки</button>
                        <button>оценить</button>
                        <button onClick={getFavorite}>получить любимые</button>
                    </div>
                </div>
                <div className={"previewItem__decs-box"}>
                    <h1>{
                        type === "movie" ?
                            moviePayload && moviePayload.title :
                            tvPayload && tvPayload.name
                    }</h1>
                    <div className={"previewItem__decs-info"}>
                        <span>{
                            type === "movie" ?
                                moviePayload && moviePayload.release_date :
                                tvPayload && tvPayload.first_air_date
                        }</span><br/>
                        <span>{movieTvPayload && movieTvPayload.vote_average}</span><br/>
                        <span>{movieTvPayload && movieTvPayload.tagline}</span><br/>
                        <span>{movieTvPayload && movieTvPayload.genres.map(item => <div key={item.id}>{item.name}</div>)}</span><br/>
                    </div>
                    <p>{movieTvPayload && movieTvPayload.overview}</p>
                </div>
            </div>
            <div className={'movieTvItem__actors'}>{
                peoplePayload && peoplePayload.cast.map(item => <div className={"movieTvItem__actors-item"} key={item.id}>{item.name}</div>)
            }</div>
            {similarPayload && <div className={"movieTvItem__similar"}>{similarPayload.results?.map(item => <div
                className={"movieTvItem__similar-item"}>
                {item.title}
            </div>)}</div>}
            <div className={"movieTvItem__recommendations"}>рекомендации</div>
            <div className={"movieTvItem__collections"}></div>
        </div>
    );
};

export default MovieTvItem;
import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import "./movieTvItem.scss"
import {YOUTUBE_URL} from "../../../API/indexAPI";
import {IMovieTvPersonPayload, IPeoplePayload, ISimilarMoviesPayload} from "../../../models/payloadAPI_M";

export type MovieTvItemType = "tv" | "movie"

interface IMovieTvItem {
    [key:string]: MovieTvItemType
}


const MovieTvItem:FC<IMovieTvItem> = ({type}) => {
    let params = useParams()

    let {fetchItem,clearItem,fetchPeople,fetchSimilar} = useAction()

    let movieTvPerson:IMovieTvPersonPayload = useTypedSelector(state => state.movieTvPerson.payload)
    let people:IPeoplePayload | null = useTypedSelector(state => state.movieTvPerson.people)
    let  similar:ISimilarMoviesPayload | null = useTypedSelector(state => state.movieTvPerson.similarMovie)

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
        return () => {
            clearItem()
        }
    },[id])

    return (
        <div className={"movieTvItem container"}>
            <div className={"movieTvItem__pre"}>
                <span>тип</span><br/>
                <span>{movieTvPerson.genres && movieTvPerson.genres[0].name}</span>
            </div>
            <div className={"movieTvItem__main"}>
                <div className={"movieTvItem__preview"}>
                    <div className={"movieTvItem__trailer"}>
                        {movieTvPerson.videos && <iframe src={`${YOUTUBE_URL}${movieTvPerson.videos.results[0].key}`}
                                 title={movieTvPerson.videos.results[0].name} allowFullScreen/>}
                    </div>
                    <div className={"movieTvItem__trailer-btns"}>
                        <button>добавить в список</button>
                        <button>избранное</button>
                        <button>закладки</button>
                        <button>оценить</button>
                        <button>{movieTvPerson.homepage}</button>
                    </div>
                </div>
                <div className={"previewItem__decs-box"}>
                    <h1>{movieTvPerson.title !== undefined ? movieTvPerson.title : movieTvPerson.name}</h1>
                    <div className={"previewItem__decs-info"}>
                        <span>{movieTvPerson.release_date}</span><br/>
                        <span>{movieTvPerson.vote_average}</span><br/>
                        <span>{movieTvPerson.tagline}</span><br/>
                        <span>{movieTvPerson.genres && movieTvPerson.genres.map(item => <div key={item.id}>{item.name}</div>)}</span><br/>
                    </div>
                    <p>{movieTvPerson.overview}</p>
                </div>
            </div>
            <div className={'movieTvItem__actors'}>{
                people && people.cast.map(item => <div className={"movieTvItem__actors-item"} key={item.id}>{item.name}</div>)
            }</div>
            <div className={"movieTvItem__similar"}>{similar && similar.results?.map(item => <div className={"movieTvItem__similar-item"}>
                {item.title}
            </div>)}</div>
            <div className={"movieTvItem__recommendations"}>рекомендации</div>
            <div className={"movieTvItem__collections"}></div>
        </div>
    );
};

export default MovieTvItem;
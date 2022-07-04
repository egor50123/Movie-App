import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import s from "./movieTvItem.module.scss"
import {BASE_IMG_URL, BIG_IMG_FILTER_URL, BIG_IMG_URL, YOUTUBE_URL} from "../../../API/indexAPI";
import {IMoviePayload, IMoviesTvsPayload, IPeoplePayload, ITvPayload} from "../../../models/payloadAPI_M";
import {useFavorite} from "../../../hooks/useFavorite";
import Card from "../../../components/Common/Card/Card";
import {cardTypes} from "../../../models/cardM";
import {MTP, MTP_TYPES} from "../../../constants/constants";
import FavouriteBtn from "../../../components/Common/Buttons/FavouriteBtn";
import ListBtn from "../../../components/Common/Buttons/ListBtn";
import RateBtn from "../../../components/Common/Buttons/RateBtn";
import WatchListBtn from "../../../components/Common/Buttons/WatchListBtn";
import CarouselBox from "../../../components/Common/CarouselBox/CarouselBox";
import ActorCard from "../../../components/Common/ActorCard/ActorCard";


interface IMovieTvItem {
    [key: string]: MTP_TYPES
}

const MovieTvItem: FC<IMovieTvItem> = ({type}) => {
    let params = useParams()
    let {fetchItem, clearItem, fetchPeople, fetchSimilar} = useAction()

    let movieTvPayload: IMoviePayload | ITvPayload | null = useTypedSelector(state => state.movieTvPerson.payload),
        peoplePayload: IPeoplePayload | null = useTypedSelector(state => state.movieTvPerson.people.payload),
        similarPayload: IMoviesTvsPayload | null = useTypedSelector(state => state.movieTvPerson.similar.payload);


    let moviePayload: IMoviePayload = movieTvPayload as IMoviePayload,
        tvPayload: ITvPayload = movieTvPayload as ITvPayload;

    let id = params.movieId

    switch (type) {
        case MTP.movie:
            id = params.movieId;
            break;
        case MTP.tv:
            id = params.tvId;
            break;
        default:
            break;
        //редирект страница не найдена
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        if (id !== undefined) {
            fetchItem(id, type)
            fetchPeople(id, type)
            fetchSimilar(id)
        }
        return () => {
            clearItem()
        }
    }, [id])

    const title = type === "movie" ?
        moviePayload && moviePayload.title :
        tvPayload && tvPayload.name

    const releaseDate = type === "movie" ?
        moviePayload && moviePayload.release_date :
        tvPayload && tvPayload.first_air_date

    // @ts-ignore
    const genres = `${movieTvPayload && (movieTvPayload.genres[0] as any).name}, ${movieTvPayload && (movieTvPayload.genres[1] as any).name}`

    const runtime = type === "movie" ?
        moviePayload && moviePayload.runtime :
        "40m"


    return (
        <div className={s.container}>
            <div className={s.headerContainer}>
                <div className={s.bgImage}>
                    <img src={`${BIG_IMG_FILTER_URL}${movieTvPayload?.backdrop_path}`} alt=""/>
                </div>
                <div className={s.header}>


                    <div className={s.posterBox}>
                        <img src={`${BASE_IMG_URL}${movieTvPayload?.poster_path}`} alt=""/>
                    </div>
                    <div className={s.headerBox}>
                        <div className={s.headerTittleBox}>
                            <h1 className={s.titleMain}>{title} <span>({releaseDate && releaseDate.slice(0, 4)})</span>
                            </h1>
                            <p className={s.titleFooter}>
                                <span>{releaseDate}</span>
                                <span>{genres}</span>
                                <span>{runtime} м</span>
                            </p>
                        </div>
                        <div className={s.headerFunctionsBox}>
                            <div className={s.voteBox}>
                                <div className={s.vote}>{movieTvPayload?.vote_average}</div>
                                <h3>Рейтинг</h3>
                            </div>
                            <div className={s.btnBox}>
                                <FavouriteBtn itemId={Number(id)} className={s.button}/>
                                <ListBtn itemId={Number(id)} typeAPI={type} className={s.button}/>
                                <RateBtn typeAPI={type} itemId={Number(id)} className={s.button}/>
                                <WatchListBtn itemId={Number(id)} className={s.button}/>
                            </div>
                        </div>
                        <div className={s.headerOverviewBox}>
                            <p className={s.tagline}>{movieTvPayload?.tagline}</p>
                            <h2>Обзор</h2>
                            <p className={s.overviewMain}>{movieTvPayload?.overview}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={s.footer}>
                <div className={s.footerColumn1}>
                    <CarouselBox title={"Рекомендации"} render={(boxClassName: any) => <div className={boxClassName}>
                        {similarPayload && similarPayload.results?.map(item => <div
                            className={s.movieTvItem__similarItem}>
                            <Card key={item.id} id={item.id}
                                  title={item.title as string || item.name as string}
                                  typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                                  bg_path={item.poster_path}
                                  overview={item.overview}
                                  vote={item.vote_average}
                                  date={item.release_date as string || item.first_air_date as string}
                                  country={item.origin_country}
                                  genres={item.genre_ids}
                                  type={cardTypes.type_1}/>
                        </div>)}
                    </div>
                    }/>
                    <CarouselBox title={"Актеры"} render={(boxClassName: any) => <div className={boxClassName}>
                        {peoplePayload && peoplePayload.cast.map(item =>
                            <ActorCard src={item.profile_path} name={item.name} key={item.id + "q"}/>
                        )}
                    </div>
                    }/>
                </div>


                <div className={s.footerColumn2}>
                    <div className={s.footerColumn2Box}>
                        <div className={s.footerColumnBoxItem}>
                            <h3>Исходное название</h3>
                            <p>See You Soon</p>
                        </div>
                        <div className={s.footerColumnBoxItem}>
                            <h3>Статус</h3>
                            <p>Выпущено</p>
                        </div>
                        <div className={s.footerColumnBoxItem}>
                            <h3>Исходный язык</h3>
                            <p>английский</p>
                        </div>
                        <div className={s.footerColumnBoxItem}>
                            <h3>Бюджет</h3>
                            <p>$59,000,000.00</p>
                        </div>
                        <div className={s.footerColumnBoxItem}>
                            <h3>Сборы</h3>
                            <p>$383,257,136.00</p>
                        </div>
                        <div className={s.footerColumnBoxItem}>
                            <h3>Ключевые слова</h3>
                            <p> Не найдено</p>
                        </div>



                    </div>
                </div>
            </div>

        </div>
        // <div className={s.movieTvItem}>
        //     <div className={s.movieTvItem__pre}>
        //         <span>тип</span><br/>
        //         <span>{movieTvPayload && movieTvPayload.genres[0].name}</span>
        //     </div>
        //     <div className={s.movieTvItem__main}>
        //         <div className={s.movieTvItem__preview}>
        //             <div className={s.movieTvItem__trailer}>
        //                 {movieTvPayload && movieTvPayload.videos?.results[0] && <iframe src={`${YOUTUBE_URL}${movieTvPayload.videos.results[0].key}`}
        //                                                           title={movieTvPayload.videos.results[0].name} allowFullScreen/>}
        //             </div>
        //             <div className={s.movieTvItem__trailer_btns}>
        //                 <button>добавить в список</button>
        //                 <button onClick={() => onFavorite(movieTvPayload?.id,true)}>избранное</button>
        //                 <button>закладки</button>
        //                 <button>оценить</button>
        //                 <button onClick={getFavorite}>получить любимые</button>
        //             </div>
        //         </div>
        //         <div className={s.previewItem__decs_info}>
        //             <h1>{
        //                 type === "movie" ?
        //                     moviePayload && moviePayload.title :
        //                     tvPayload && tvPayload.name
        //             }</h1>
        //             <div className={s.previewItem__decsInfo}>
        //                 <span>{
        //                     type === "movie" ?
        //                         moviePayload && moviePayload.release_date :
        //                         tvPayload && tvPayload.first_air_date
        //                 }</span><br/>
        //                 <span>{movieTvPayload && movieTvPayload.vote_average}</span><br/>
        //                 <span>{movieTvPayload && movieTvPayload.tagline}</span><br/>
        //                 <span>{movieTvPayload && movieTvPayload.genres.map(item => <div key={item.id}>{item.name}</div>)}</span><br/>
        //             </div>
        //             <p>{movieTvPayload && movieTvPayload.overview}</p>
        //         </div>
        //     </div>
        //     <div className={s.movieTvItem__actors}>{
        //         peoplePayload && peoplePayload.cast.map(item => <div className={s.movieTvItem__actorsItem} key={item.id}>{item.name}</div>)
        //     }</div>
        //     {similarPayload && <div className={s.movieTvItem__similar}>{similarPayload.results?.map(item => <div
        //         className={s.movieTvItem__similarItem}>
        //         <Card key={item.id} id={item.id}
        //               title={item.title as string || item.name as string}
        //               typeAPI={item.title === undefined ? MTP.tv : MTP.movie }
        //               bg_path={item.poster_path}
        //               overview={item.overview}
        //               vote={item.vote_average}
        //               date={item.release_date as string || item.first_air_date as string}
        //               country={item.origin_country}
        //               genres={item.genre_ids}
        //               type={cardTypes.type_1}/>
        //     </div>)}</div>}
        //     <div className={s.movieTvItem__recommendations}>рекомендации</div>
        //     <div className={s.movieTvItem__collections}></div>
        // </div>
    );
};

export default MovieTvItem;
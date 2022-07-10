import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import s from "./movieTvItem.module.scss"
import {BASE_IMG_URL, BIG_IMG_FILTER_URL} from "../../../API/indexAPI";
import {IMoviePayload, IMoviesTvsPayload, IPeoplePayload, ITvPayload} from "../../../models/payloadAPI_M";
import Card from "../../../components/Common/Card/Card";
import {accountBtnsTypes, buttonsSize, MTP, MTP_TYPES, tooltipPlacementC} from "../../../constants/constants";
import CarouselBox from "../../../components/Common/CarouselBox/CarouselBox";
import ActorCard from "../../../components/Common/ActorCard/ActorCard";
import SmallCard from "../../../components/Common/Card/SmallCard/SmallCard";
import ButtonContainer from "../../../components/Common/ButtonContainer/ButtonContainer";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import RateMenu from "../../../components/Common/ButtonContainer/ButtonMenu/RateMenu/RateMenu";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import ListMenu from "../../../components/Common/ButtonContainer/ButtonMenu/ListMenu/ListMenu";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";


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

    let id = params.movieId as string

    switch (type) {
        case MTP.movie:
            id = params.movieId as string;
            break;
        case MTP.tv:
            id = params.tvId as string;
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
    // жанры нормально сделать
    //const genres = `${movieTvPayload && movieTvPayload?.genres[0].name}`

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
                                <span>{"Ужасы, боевик"}</span>
                                <span>{runtime} м</span>
                            </p>
                        </div>
                        <div className={s.headerFunctionsBox}>
                            <div className={s.voteBox}>
                                <div className={s.vote}>{movieTvPayload?.vote_average}</div>
                                <h3>Рейтинг</h3>
                            </div>
                            <div className={s.btnBox}>
                                <ButtonContainer btnType={accountBtnsTypes.rate}
                                                 itemId={+id} size={buttonsSize.large}
                                                 className={s.button}
                                                 notLink={s.notLink}
                                                 menuPlacement={"bottom"}
                                                 tooltipPlacement={tooltipPlacementC.top}
                                                 iconComponentRender={() => StarBorderOutlinedIcon}
                                                 renderMenu={() => <RateMenu typeAPI={type}
                                                                             itemId={+id}/>}/>
                                <ButtonContainer btnType={accountBtnsTypes.favourite}
                                                 itemId={+id} size={buttonsSize.large}
                                                 className={s.button}
                                                 tooltipPlacement={tooltipPlacementC.top}
                                                 notLink={s.notLink}
                                                 iconComponentRender={() => FavoriteBorderTwoToneIcon}/>
                                <ButtonContainer btnType={accountBtnsTypes.list}
                                                 itemId={+id} size={buttonsSize.large}
                                                 className={s.button}
                                                 notLink={s.notLink}
                                                 tooltipPlacement={tooltipPlacementC.top}
                                                 iconComponentRender={() => FormatListBulletedTwoToneIcon}
                                                 menuPlacement={"bottom"}
                                                 renderMenu={() => <ListMenu typeAPI={type}
                                                                             itemId={+id}/>}/>
                                <ButtonContainer btnType={accountBtnsTypes.watchList}
                                                 itemId={+id} size={buttonsSize.large}
                                                 className={s.button}
                                                 tooltipPlacement={tooltipPlacementC.top}
                                                 notLink={s.notLink}
                                                 iconComponentRender={() => BookmarkBorderTwoToneIcon}/>
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
                            <Card id={item.id}
                                  typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                                  renderCard={() => <SmallCard  key={item.id} id={item.id}
                                                                title={item.title as string || item.name as string}
                                                                typeAPI={item.title === undefined ? MTP.tv : MTP.movie }
                                                                bg_path={item.poster_path}
                                                                overview={item.overview}
                                                                vote={item.vote_average}
                                                                date={item.release_date as string || item.first_air_date as string}
                                                                country={item.origin_country}
                                                                genres={item.genre_ids}/>}/>
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
    );
};

export default MovieTvItem;
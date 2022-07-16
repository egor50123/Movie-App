import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import s from "./movieTvItem.module.scss"
import {BASE_IMG_URL, BIG_IMG_FILTER_URL} from "../../../API/indexAPI";
import {IMoviePayload, ITvPayload} from "../../../models/payloadAPI_M";
import { MTP} from "../../../constants/constants";
import CarouselBoxes from "./CarouselBoxes/CarouselBoxes";
import Aside from "./Aside/Aside";
import MainInfo from "./MainInfo/MainInfo";
import {IMovieTvItem} from "../../../models/indexM";
import {movieTvItem, movieTvLoading} from "../../../store/selectors/commonSelectors";
import Loading from "../Loading/Loading";


const MovieTvItem: FC<IMovieTvItem> = ({type}) => {
    const params = useParams()
    const {fetchItem, clearItem, fetchPeople, fetchSimilar} = useAction()
    const movieTvPayload: IMoviePayload | ITvPayload | null = useTypedSelector(movieTvItem)
    const isLoading = useTypedSelector(movieTvLoading)
    const id = type === MTP.movie ? params.movieId as string : params.tvId as string

    console.log(params)

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

    return (
        !isLoading || movieTvPayload ?
        <div className={s.container}>
            <div className={s.headerContainer}>
                <div className={s.bgImage}>
                    <img src={`${BIG_IMG_FILTER_URL}${movieTvPayload?.backdrop_path}`} alt=""/>
                </div>
                <div className={s.header}>
                    <div className={s.posterBox}>
                        <img src={`${BASE_IMG_URL}${movieTvPayload?.poster_path}`} alt=""/>
                    </div>
                    <MainInfo type={type} movieTvPayload={movieTvPayload} id={id}/>
                </div>
            </div>
            <div className={s.footer}>
                <CarouselBoxes/>
                <Aside/>
            </div>
        </div> : <Loading/>
    );
};

export default MovieTvItem;
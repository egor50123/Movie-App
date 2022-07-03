import React, {FC, useRef, useState} from "react";
import "./сard.scss"
import {BASE_IMG_URL} from "../../../API/indexAPI";
import styles from "./card.module.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICard} from "../../../models/cardM";
import * as mainPageSelectors from "../../../store/selectors/mainPageSelectors";
import {Rating, SvgIcon} from "@mui/material";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import WatchListBtn from "../Buttons/WatchListBtn";
import FavouriteBtn from "../Buttons/FavouriteBtn";
import RateBtn from "../Buttons/RateBtn";
import ListBtn from "../Buttons/ListBtn";
import classNames from "classnames";
import {Navigate, useNavigate} from "react-router-dom";

const Card: FC<ICard> = ({
                             title,
                             bg_path,
                             vote,
                             type,
                             id,
                             overview,
                             genres,
                             typeAPI,
                             listType = null,
                             date
                         }) => {

    const genresTv = useTypedSelector(mainPageSelectors.genresTv)
    const genresMovie = useTypedSelector(mainPageSelectors.genresMovie)
    const cardRef = useRef<null | HTMLDivElement>(null)
    const navigate = useNavigate()

    let [isHover, setHover] = useState(false)
    let mainGenres = typeAPI === "movie" ?
        `${genresMovie?.find(item => genres && item.id === genres[0])?.name},
                            ${genresMovie?.find(item => genres && item.id === genres[1])?.name || ""}` :
        genresTv?.find(item => genres && item.id === genres[0])?.name

    const cardClassName = classNames({
        [`${styles.card}`]: true,
        [`${styles.card__hover}`]: isHover
    })

    function onLink (e:React.MouseEvent<HTMLElement>) {
        console.log(e.target)
        console.log((e.target as HTMLElement).closest(`.${styles.button}`))
        if ((e.target as HTMLElement).closest(`.${styles.button}`)) return
        navigate(`/${typeAPI}/${id} `)
    }

    return (
        // сделать обычный div с обработчиком на редирект
        <div ref={cardRef} onClick={(e) => onLink(e)} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}
             className={cardClassName}>
            {/*to={`/${typeAPI}/${id} `}*/}
            <div className={styles.card_box}>
                <div className={styles.card_img}>
                    {bg_path !== null ? <img src={`${BASE_IMG_URL}${bg_path}`} alt=""/> :
                        <SvgIcon sx={{fontSize: 90}} component={InsertPhotoIcon} inheritViewBox/>}
                </div>

                {isHover && <div className={styles.hover}>
                  <div className={styles.buttons_box}>
                    <RateBtn itemId={id} typeAPI={typeAPI} className={styles.button}/>
                    <FavouriteBtn listType={listType} cardRef={cardRef.current} itemId={id} className={styles.button}/>
                    <ListBtn typeAPI={typeAPI} itemId={id} className={styles.button}/>
                    <WatchListBtn listType={listType} cardRef={cardRef.current} itemId={id} className={styles.button}/>
                  </div>
                  <div>
                    <div className={styles.vote}>{vote}</div>
                    <div className={styles.genres}>{mainGenres}</div>
                    <div className={styles.date}>{date}</div>
                  </div>
                </div>}

                <div className={styles.card_title_box}>
                    <h2>{title && title?.length > 30 ? title?.slice(0, 30) : title}</h2>
                </div>
            </div>
        </div>

    )
}

export default Card

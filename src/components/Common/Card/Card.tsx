import React, {FC, useRef, useState} from "react";
import "./сard.scss"
import {NavLink} from "react-router-dom";
import {BASE_IMG_URL} from "../../../API/indexAPI";
import styles from "./card.module.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICard} from "../../../models/cardM";
import {getCardClassType} from "../../../helpers/getCardClassType";
import {useFavorite} from "../../../hooks/useFavorite";
import * as mainPageSelectors from "../../../store/selectors/mainPageSelectors";
import {useWatchList} from "../../../hooks/useWatchList";
import {ProfileLinksNames} from "../../../models/ProfileM";
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import {createTheme} from '@mui/material/styles';


const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            // @ts-ignore
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

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
    const setFavorite = useFavorite()
    const setWatchList = useWatchList()
    const cardRef = useRef<null | HTMLAnchorElement>(null)

    const classType = getCardClassType()

    const addFavourite = (e: React.MouseEvent<Element, MouseEvent>): void => {
        e.preventDefault()
        deleteOrSaveCard(ProfileLinksNames.favorites)
        setFavorite({itemId: id, isFavorite: true})
    }

    const addWatchList = (e: React.MouseEvent<Element, MouseEvent>): void => {
        e.preventDefault()
        deleteOrSaveCard(ProfileLinksNames.watchlist)
        setWatchList({itemId: id, isToWatchList: true})
    }

    function deleteOrSaveCard(type: string) {
        if (listType === type && cardRef !== null) {
            (cardRef.current as HTMLAnchorElement).style.display = "none"
        }
    }

    let [isHover, setHover] = useState(false)
    let mainGenres = typeAPI === "movie" ?
        `${genresMovie?.find(item => genres && item.id === genres[0])?.name},
                            ${genresMovie?.find(item => genres && item.id === genres[1])?.name || ""}` :
        genresTv?.find(item => genres && item.id === genres[0])?.name
    return (
        <NavLink to={`/${typeAPI}/${id} `} ref={cardRef}  onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className={styles.card}>
            <div className={styles.card_box}>
                <div className={styles.card_img}>
                    {bg_path !== null ? <img src={`${BASE_IMG_URL}${bg_path}`} alt=""/> :
                        <SvgIcon  sx={{ fontSize: 90 }} component={InsertPhotoIcon} inheritViewBox />}
                </div>

                {isHover && <div className={styles.hover}>
                  <div className={styles.buttons_box}>
                    <Tooltip title={"Оценить"} placement={"right"}>
                      <div className={styles.button}>
                        <IconButton color={'default'} size={"small"}>
                          <SvgIcon sx={{fontSize: 15}} component={StarBorderOutlinedIcon} inheritViewBox/>
                        </IconButton>
                      </div>

                    </Tooltip>
                    <Tooltip title={"В избранное"} placement={"right"}>
                      <div onClick={(e) => addFavourite(e)} className={styles.button}>
                        <IconButton color={'default'} size={"small"}>
                          <SvgIcon sx={{fontSize: 15}} component={FavoriteBorderTwoToneIcon} inheritViewBox/>
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Tooltip title={"Добавить в список"} placement={"right"}>
                      <div className={styles.button}>
                        <IconButton color={'default'} size={"small"}>
                          <SvgIcon sx={{fontSize: 15}} component={FormatListBulletedTwoToneIcon} inheritViewBox/>
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Tooltip title={"В закладки"} placement={"right"}>
                      <div onClick={(e) => addWatchList(e)} className={styles.button}>
                        <IconButton color={'default'} size={"small"}>
                          <SvgIcon sx={{fontSize: 15}} component={BookmarkBorderTwoToneIcon} inheritViewBox/>
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                  <div>
                    <div className={styles.vote}>{vote}</div>
                    <div className={styles.genres}>{mainGenres}</div>
                    <div className={styles.date}>{date}</div>
                  </div>
                </div>}

                <div className={styles.card_title_box}>
                    <h2>{title && title?.length > 30 ? title?.slice(0,30) : title}</h2>
                </div>
            </div>
        </NavLink>

    )
}

export default Card

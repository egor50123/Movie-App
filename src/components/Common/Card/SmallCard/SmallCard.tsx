import React, {FC, useRef, useState} from 'react';
import styles from "../card.module.scss";
import {BASE_IMG_URL} from "../../../../API/indexAPI";
import {SvgIcon} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ButtonContainer from "../../ButtonContainer/ButtonContainer";
import {accountBtnsTypes, buttonsSize} from "../../../../constants/constants";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ButtonMenu from "../../ButtonContainer/ButtonMenu/ButtonMenu";
import RateMenu from "../../ButtonContainer/ButtonMenu/RateMenu/RateMenu";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import ListMenu from "../../ButtonContainer/ButtonMenu/ListMenu/ListMenu";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import {ICard} from "../../../../models/cardM";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import * as mainPageSelectors from "../../../../store/selectors/mainPageSelectors";
import classNames from "classnames";

const SmallCard:FC<ICard> = ({
                       title,
                       bg_path,
                       vote,
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

    let [isHover, setHover] = useState(false)
    let mainGenres = typeAPI === "movie" ?
        `${genresMovie?.find(item => genres && item.id === genres[0])?.name},
                            ${genresMovie?.find(item => genres && item.id === genres[1])?.name || ""}` :
        genresTv?.find(item => genres && item.id === genres[0])?.name

    const cardClassName = classNames({
        [`${styles.card}`]: true,
        [`${styles.card__hover}`]: isHover
    })

    return (
        <div ref={cardRef} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}
             className={cardClassName}>
            <div className={styles.card_box}>
                <div className={styles.card_img}>
                    {bg_path !== null ? <img src={`${BASE_IMG_URL}${bg_path}`} alt="" loading={"lazy"}/> :
                        <SvgIcon sx={{fontSize: 90}} component={InsertPhotoIcon} inheritViewBox/>}
                </div>

                {isHover && <div className={styles.hover}>
                  <div className={styles.buttons_box}>
                    <ButtonContainer btnType={accountBtnsTypes.rate}
                                     itemId={id} size={buttonsSize.small}
                                     className={styles.button}
                                     notLink={styles.notLink}
                                     iconComponentRender={() => StarBorderOutlinedIcon}
                                     menuRender={() => <ButtonMenu notLink={styles.notLink} render={() => <RateMenu typeAPI={typeAPI} itemId={id}/>}/>}/>
                    <ButtonContainer btnType={accountBtnsTypes.favourite}
                                     itemId={id} size={buttonsSize.small}
                                     className={styles.button}
                                     notLink={styles.notLink}
                                     iconComponentRender={() => FavoriteBorderTwoToneIcon}/>
                    <ButtonContainer btnType={accountBtnsTypes.list}
                                     itemId={id} size={buttonsSize.small}
                                     className={styles.button}
                                     notLink={styles.notLink}
                                     iconComponentRender={() => FormatListBulletedTwoToneIcon}
                                     menuRender={() => <ButtonMenu notLink={styles.notLink} render={() => <ListMenu typeAPI={typeAPI} itemId={id}/>}/>}/>
                    <ButtonContainer btnType={accountBtnsTypes.watchList}
                                     itemId={id} size={buttonsSize.small}
                                     className={styles.button}
                                     notLink={styles.notLink}
                                     iconComponentRender={() => BookmarkBorderTwoToneIcon}/>
                  </div>
                  <div>
                    <div className={(styles.vote)}>{vote?.toFixed(1)}</div>
                    <div className={styles.genres}>{mainGenres}</div>
                    <div className={styles.date}>{date}</div>
                  </div>
                </div>}

                <div className={styles.card_title_box}>
                    <h2>{title && title?.length > 30 ? title?.slice(0, 30) : title}</h2>
                </div>
            </div>
        </div>
    );
};

export default SmallCard;
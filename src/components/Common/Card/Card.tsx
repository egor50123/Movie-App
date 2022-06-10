import React, {FC, useRef} from "react";
import "./Card.scss"
import {NavLink} from "react-router-dom";
import {BASE_IMG_URL} from "../../../API/indexAPI";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICard} from "../../../models/cardM";
import {getCardClassType} from "../../../helpers/getCardClassType";
import {useFavorite} from "../../../hooks/useFavorite";
import * as mainPageSelectors from "../../../store/selectors/mainPageSelectors";
import {useWatchList} from "../../../hooks/useWatchList";
import {ProfileLinksNames} from "../../../models/ProfileM";

const Card: FC<ICard> = ({title,
                             bg_path,
                             vote,
                             type,
                             id,
                             overview,
                             genres,
                             typeAPI,
                             listType= null,
                             date}) => {

    const genresTv = useTypedSelector(mainPageSelectors.genresTv)
    const genresMovie = useTypedSelector(mainPageSelectors.genresMovie)
    const setFavorite = useFavorite()
    const setWatchList = useWatchList()
    const cardRef = useRef<null | HTMLAnchorElement>(null)

    const classType = getCardClassType()

    const addFavourite = (e:React.MouseEvent<Element, MouseEvent>):void => {
        e.preventDefault()
        deleteOrSaveCard(ProfileLinksNames.favorites)
        setFavorite({itemId:id, isFavorite:true})
    }

    const addWatchList = (e:React.MouseEvent<Element, MouseEvent>):void => {
        e.preventDefault()
        deleteOrSaveCard(ProfileLinksNames.watchlist)
        setWatchList({itemId:id, isToWatchList:true})
    }

    function deleteOrSaveCard (type:string) {
        if ( listType === type && cardRef !== null) {
            (cardRef.current as HTMLAnchorElement).style.display = "none"
        }
    }


    return (
        <NavLink ref={cardRef} className={`${classType[type].card} `} to={`/${typeAPI}/${id} `}>
            <div className={`${classType[type].card__header}`}>
                <img src={`${BASE_IMG_URL}${bg_path}`} alt=""/>
            </div>
            <div className={`${classType[type].card__main} `}>
                <div className={`${classType[type].card__titleBox}`}>
                    <h1 className={`${classType[type].card__title}`}>{title}</h1>
                    <div className={`${classType[type].card__date}`}>{date}</div>
                    <div className={`${classType[type].card__vote}`}>{vote}</div>
                </div>

                <p className={`${classType[type].card__overview}`}>{overview}</p>
                <div className={`${classType[type].card__btns}`}>
                    <button data-tooltip = "Оценить">&#9734;<span>оценить</span></button>
                    <button  onClick={(e) => addFavourite(e)} data-tooltip = "В избранное">&#9829;<span>избранное</span></button>
                    <button data-tooltip = "Добавить в список">&#65049;<span>в список</span></button>
                    <button onClick={(e) => addWatchList(e)} data-tooltip = "В закладки">&#1349;<span>позже</span></button>
                    <button>del<span>удалить</span></button>
                </div>

                <div className={`${classType[type].card__genres}`}>{
                    typeAPI === "movie" ?
                        genresMovie?.find( item => genres && item.id === genres[0])?.name :
                        genresTv?.find( item => genres && item.id === genres[0])?.name}</div>
            </div>
        </NavLink>
    )
}

export default Card

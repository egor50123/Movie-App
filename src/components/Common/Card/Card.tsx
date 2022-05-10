import {FC} from "react";
import "./Card.scss"
import {NavLink} from "react-router-dom";
import {BASE_IMG_URL} from "../../../API/indexAPI";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICard} from "../../../models/cardM";
import {getCardClassType} from "../../../helpers/getCardClassType";

const Card: FC<ICard> = ({title,
                             bg_path,
                             vote,
                             type,
                             id,
                             overview,
                             country,
                             genres,
                             date}) => {

    const genresTotal = useTypedSelector(state => state.mainPage.genres.payload)

    const classType = getCardClassType()

    return (
        <NavLink className={`${classType[type].card} `} to={`/${title !== undefined ? "movie" : "tv"}/${id} `}>
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
                    <button data-tooltip = "В избранное">&#9829;<span>избранное</span></button>
                    <button data-tooltip = "Добавить в список">&#65049;<span>в список</span></button>
                    <button data-tooltip = "В закладки">&#1349;<span>позже</span></button>
                    <button>del<span>удалить</span></button>
                </div>

                <div className={`${classType[type].card__genres}`}>{genresTotal?.find( item => genres && item.id === genres[0])?.name}</div>
            </div>

        </NavLink>
    )
}

export default Card

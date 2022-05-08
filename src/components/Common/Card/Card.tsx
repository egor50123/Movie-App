import {FC} from "react";
import "./Card.scss"
import {NavLink} from "react-router-dom";
import {BASE_IMG_URL} from "../../../API/indexAPI";

export interface ICard {
    title: string | undefined,
    overview: string,
    id: number,
    vote: number,
    bg_path: string | null,
    type?: string

}

const Card: FC<ICard> = ({title, bg_path, vote, type, id, overview}) => {
    return (
        <NavLink className={"card"} to={`/${title !== undefined ? "movie" : "tv"}/${id} `}>
            <div className={"card__img"}><img src={`${BASE_IMG_URL}${bg_path}`} alt=""/></div>
            <h1>{title}</h1>
            {/*<p>overview</p>*/}
            <div className={"card__btns"}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </div>
            <span className={"card__date"}>12.02.2001</span>
        </NavLink>
    )
}

export default Card

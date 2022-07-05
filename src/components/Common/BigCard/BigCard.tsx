import React, {FC} from 'react';
import {ICard} from "../../../models/cardM";
import s from "./bigCard.module.scss"
import {BASE_IMG_URL} from "../../../API/indexAPI";
import RateBtn from "../Buttons/RateBtn";
import FavouriteBtn from "../Buttons/FavouriteBtn";
import ListBtn from "../Buttons/ListBtn";
import WatchListBtn from "../Buttons/WatchListBtn";
import {useNavigate} from "react-router-dom";

const BigCard:FC<ICard> = ({
                               title,
                               bg_path,
                               vote,
                               type,
                               id,
                               overview,
                               typeAPI,
                               listType = null,
                               date
                           }) => {
    const navigate = useNavigate()

    function onLink (e:React.MouseEvent<HTMLElement>) {
        if ((e.target as HTMLElement).closest(`.${s.button}`)) return
        navigate(`/${typeAPI}/${id} `)
    }

    return (
        <div className={s.root} onClick={(e) => onLink(e)}>
            <div className={s.imgBox}>
                <img src={`${BASE_IMG_URL}/${bg_path}`} alt=""/>
            </div>
            <div className={s.mainBox}>
                <div className={s.titleBox}>
                    <div className={s.vote}>{vote}</div>
                    <h2>{title}</h2>
                </div>
                <div className={s.overviewBox}>
                    {overview && overview?.length > 240 ? overview.slice(0,240) + "..." : overview || "Не нашлось описания на русском языке или оно отсутствует"}
                </div>
                <div className={s.btnsBox}>
                    <RateBtn itemId={id} typeAPI={typeAPI} className={s.button} size={"medium"}/>
                    <FavouriteBtn typeAPI={typeAPI} listType={listType} itemId={id} className={s.button} size={"medium"}/>
                    <ListBtn typeAPI={typeAPI} itemId={id} className={s.button} size={"medium"}/>
                    <WatchListBtn typeAPI={typeAPI} listType={listType} itemId={id} className={s.button} size={"medium"}/>
                </div>
            </div>
        </div>
    );
};

export default BigCard;
import React, {FC} from 'react';
import s from "./actorCard.module.scss"
import {BASE_IMG_URL} from "../../../API/indexAPI";
import {IActorCard} from "../../../models/indexM";


const ActorCard:FC<IActorCard> = ({src,name}) => {
    return (
        <div className={s.root}>
            <div className={s.imgBox}>
                <img src={`${BASE_IMG_URL}${src}`} alt=""/>
            </div>
            <div className={s.info}>
                <h3>{name}</h3>
            </div>
        </div>
    );
};

export default ActorCard;
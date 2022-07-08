import React, {FC} from "react";
import styles from "./card.module.scss"

import {useNavigate} from "react-router-dom";
import {MTP_TYPES} from "../../../constants/constants";


interface ICardContainer {
    renderCard:any,
    typeAPI: MTP_TYPES,
    id:number
}

const Card:FC<ICardContainer> = ({renderCard,id,typeAPI}) => {
    const navigate = useNavigate()

    function onLink (e:React.MouseEvent<HTMLElement>) {
        const isReturn = (e.target as HTMLElement).closest(`.${styles.notLink}`) || (e.target as HTMLElement).closest(".MuiModal-root")
        if (isReturn) return
        navigate(`/${typeAPI}/${id} `)
    }

    return (
        <div onClick={(e) => onLink(e)}>
            {renderCard()}
        </div>
    )
}

export default Card

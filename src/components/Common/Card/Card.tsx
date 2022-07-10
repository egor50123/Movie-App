import React, {FC, useEffect} from "react";
import styles from "./card.module.scss"
import {useLocation, useNavigate} from "react-router-dom";
import {accountBtnsTypes, MTP_TYPES} from "../../../constants/constants";
import {useAction} from "../../../hooks/useAction";
import {convertBtnTypeToHrefType} from "../../../helpers/convertBtnTypeToHrefType";



interface ICardContainer {
    renderCard: any,
    typeAPI: MTP_TYPES,
    id: number,
    canDelete?: boolean
}

export interface IDelete {
    id: number,
    btnType: string
}

const Card: FC<ICardContainer> = ({renderCard, id, typeAPI,canDelete= false}) => {
    const {deleteCard, clearDeleteCardIds} = useAction()
    const navigate = useNavigate()
    const href = useLocation()

    const deleteCallback = ({id, btnType}: IDelete) => {
        convertBtnTypeToHrefType(btnType, href.pathname) && deleteCard(id)
        canDelete && btnType === accountBtnsTypes.delete && deleteCard(id)
    }

    useEffect(() => {
        clearDeleteCardIds()
        return () => {
            clearDeleteCardIds()
        }
    }, [])

    function onLink(e: React.MouseEvent<HTMLElement>) {
        const isReturn = (e.target as HTMLElement).closest(`.${styles.notLink}`) || (e.target as HTMLElement).closest(".MuiModal-root")
        if (isReturn) return
        navigate(`/${typeAPI}/${id} `)
    }

    return (
        <div onClick={(e) => onLink(e)}>
            {renderCard(deleteCallback)}
        </div>
    )
}

export default Card

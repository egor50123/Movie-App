import React, {FC} from 'react';
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import s from "./buttons.module.scss";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import {ProfileLinksNames} from "../../../models/ProfileM";
import {useAccountBtns} from "../../../hooks/useAccountBtns";

interface IFavouriteBtn {
    cardRef?:null | HTMLDivElement
    listType?: string | null,
    itemId: number,
    className: string
}

const FavouriteBtn:FC<IFavouriteBtn> = ({cardRef,listType,itemId,className}) => {
    const {setFavorite} = useAccountBtns()

    function deleteOrSaveCard(type: string) {
        if (listType === type && cardRef !== null) {
            (cardRef as HTMLDivElement).style.display = "none"
        }
    }

    const addFavourite = (e: React.MouseEvent<Element, MouseEvent>): void => {
        e.preventDefault()
        deleteOrSaveCard(ProfileLinksNames.favorites)
        setFavorite({itemId, isFavorite: true})
    }

    return (
        <div className={className}>
            <Tooltip title={"В избранное"} placement={"right"}>
                <div onClick={(e) => addFavourite(e)} >
                    <IconButton color={'default'} size={"small"}>
                        <SvgIcon sx={{fontSize: 15}} component={FavoriteBorderTwoToneIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
        </div>

    );
};

export default FavouriteBtn;
import React, {FC} from 'react';
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import {IProps} from "./types";
import {accountBtnsTypes} from "../../../constants/constants";
import useButtonClick from "../../../hooks/useButtonClick";


const FavouriteBtn:FC<IProps> = ({cardRef,listType,itemId,className,size = "small",typeAPI}) => {
    function deleteOrSaveCard(type: string) {
        if (listType === type && cardRef !== null) {
            (cardRef as HTMLDivElement).style.display = "none"
        }
    }

    const [_,onFavourite] = useButtonClick(accountBtnsTypes.favourite)

    return (
        <div className={className}>
            <Tooltip title={"В избранное"} placement={"right"}>
                <div onClick={(e) => onFavourite({e,itemId})} >
                    <IconButton color={'default'} size={size}>
                        <SvgIcon sx={{fontSize: 15}} component={FavoriteBorderTwoToneIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
        </div>

    );
};

export default FavouriteBtn;
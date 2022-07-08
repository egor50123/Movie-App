import React, {FC} from 'react';
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import s from "./buttons.module.scss"
import {IProps} from "./types";
import useButtonClick from "../../../hooks/useButtonClick";
import {accountBtnsTypes} from "../../../constants/constants";


const WatchListBtn:FC<IProps> = ({cardRef,listType,itemId,className,size = "small",typeAPI}) => {

    function deleteOrSaveCard(type: string) {
        if (listType === type && cardRef !== null) {
            (cardRef as HTMLDivElement).style.display = "none"
        }
    }

    const [_,onWatchList] = useButtonClick(accountBtnsTypes.watchList)

    return (
        <div className={className}>
            <Tooltip title={"В закладки"} placement={"right"}>
                <div onClick={(e) => onWatchList({e,itemId})} className={s.button}>
                    <IconButton color={'default'} size={"small"}>
                        <SvgIcon sx={{fontSize: 15}} component={BookmarkBorderTwoToneIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
        </div>

    );
};

export default WatchListBtn;
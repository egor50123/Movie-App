import React, {FC} from 'react';
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import {useAccountBtns} from "../../../hooks/useAccountBtns";
import {ProfileLinksNames} from "../../../models/ProfileM";
import s from "./buttons.module.scss"

interface IWatchListBtn {
    cardRef?:null | HTMLDivElement
    listType?: string | null,
    itemId: number,
    className: string
}

const WatchListBtn:FC<IWatchListBtn> = ({cardRef,listType,itemId,className}) => {
    const {setWatchList} = useAccountBtns()

    function deleteOrSaveCard(type: string) {
        if (listType === type && cardRef !== null) {
            (cardRef as HTMLDivElement).style.display = "none"
        }
    }

    const addWatchList = (e: React.MouseEvent<Element, MouseEvent>): void => {
        e.preventDefault()
        deleteOrSaveCard(ProfileLinksNames.watchlist)
        setWatchList({itemId, isToWatchList: true})
    }

    return (
        <div className={className}>
            <Tooltip title={"В закладки"} placement={"right"}>
                <div onClick={(e) => addWatchList(e)} className={s.button}>
                    <IconButton color={'default'} size={"small"}>
                        <SvgIcon sx={{fontSize: 15}} component={BookmarkBorderTwoToneIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
        </div>

    );
};

export default WatchListBtn;
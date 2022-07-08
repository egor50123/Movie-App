import React, {FC} from 'react';
import {
    IconButton,
    SvgIcon,
    Tooltip,
} from "@mui/material";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import s from "./buttons.module.scss"
import {IProps} from "./types";
import useButtonClick from "../../../hooks/useButtonClick";
import {accountBtnsTypes} from "../ButtonContainer/ButtonContainer";

export interface IListBtnCurrentList {
    [id:number]: {
        flag:boolean,
        name:string
    }
}


const ListBtn:FC<IProps> = ({itemId,typeAPI,className,size = "small"}) => {
    const [_,onList] = useButtonClick(accountBtnsTypes.list)

    return (
        <div className={s.button}>
            <Tooltip title={"Добавить в список"} placement={"right"}>
                <div onClick={(e) => onList({e,itemId})} className={className}>
                    <IconButton color={'default'} size={size}>
                        <SvgIcon sx={{fontSize: 15}} component={FormatListBulletedTwoToneIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
        </div>
    );
};

export default ListBtn;
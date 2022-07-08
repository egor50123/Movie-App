import React, {FC} from 'react';
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import useButtonClick from "../../../hooks/useButtonClick";
import {buttonsSize, tooltipPlacementC} from "../../../constants/constants";
import s from "./buttonContainer.module.scss"
import classNames from "classnames";

export enum accountBtnsTypes {
    favourite = "favourite",
    list = "list",
    rate = "rate",
    watchList = "watchList"
}

interface IButtonContainer {
    className?: string,
    btnType: string,
    itemId:number
    size?: buttonsSize.small | buttonsSize.medium | buttonsSize.large,
    iconComponentRender: any,
    menuRender?: any,
    notLink: string,
    tooltipPlacement?: tooltipPlacementC.left | tooltipPlacementC.bottom | tooltipPlacementC.top

}

const ButtonContainer:FC<IButtonContainer> = ({btnType,
                                                  className,
                                                  size = buttonsSize.small,
                                                  itemId,
                                                  iconComponentRender,
                                                  menuRender,notLink,
                                                  tooltipPlacement = tooltipPlacementC.left}) => {

    const [isMenuOpen,onClick] = useButtonClick(btnType)
    const classnames = classNames({
        [`${s.root}`]: true,
        [`${notLink}`]: true,
    })

    return (
        <div className={classnames}>
            <div className={className}>
                <Tooltip title={"В избранное"} placement={tooltipPlacement}>
                    <div onClick={(e) => onClick({e,itemId})} >
                        <IconButton color={'default'} size={size}>
                            <SvgIcon sx={{fontSize: 15}} component={iconComponentRender()} inheritViewBox/>
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
            {typeof menuRender === "function" && isMenuOpen && menuRender(notLink)}
        </div>


    );
};

export default ButtonContainer;
import React, {FC} from 'react';
import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import useButtonClick from "../../../hooks/useButtonClick";
import {buttonsSize, MTP_TYPES, tooltipPlacementC} from "../../../constants/constants";
import s from "./buttonContainer.module.scss"
import classNames from "classnames";
import {IDelete} from "../Card/Card";
import {getTooltipValue} from "../../../helpers/getTooltipValue";
import ButtonMenu, {TMenuPlacement} from "./ButtonMenu/ButtonMenu";


interface IButtonContainer {
    className?: string,
    btnType: string,
    itemId:number
    size?: buttonsSize.small | buttonsSize.medium | buttonsSize.large,
    iconComponentRender: any,
    notLink: string,
    tooltipPlacement?: tooltipPlacementC.left | tooltipPlacementC.bottom | tooltipPlacementC.top,
    callback?: ({id,btnType}:IDelete) => void,
    typeAPI?: MTP_TYPES | null,
    menuPlacement?:TMenuPlacement,
    renderMenu?:any

}

const ButtonContainer:FC<IButtonContainer> = ({btnType,typeAPI = null,
                                                  className,
                                                  size = buttonsSize.small,
                                                  itemId,callback ,
                                                  iconComponentRender,menuPlacement,
                                                  renderMenu,notLink,
                                                  tooltipPlacement = tooltipPlacementC.left}) => {

    const [isMenuOpen,onClick] = useButtonClick(btnType)
    const classnames = classNames({
        [`${s.root}`]: true,
        [`${notLink}`]: true,
    })

    function closeMenu () {
        if (typeof onClick === "function") onClick({itemId,type:typeAPI as MTP_TYPES})
    }

    return (
        <div id={String(itemId)} className={classnames}>
            <div className={className}>
                <Tooltip title={getTooltipValue(btnType)} placement={tooltipPlacement}>
                    <div onClick={(e) => {
                        if (typeof callback === "function") callback({id: itemId, btnType})
                        if (typeof onClick === "function") onClick({e, itemId,type:typeAPI as MTP_TYPES})
                    }} >
                        <IconButton color={'default'} size={size}>
                            <SvgIcon sx={{fontSize: 15}} component={iconComponentRender()} inheritViewBox/>
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
            {typeof renderMenu === "function" && isMenuOpen && <ButtonMenu placement={menuPlacement}
                                                                           callback={closeMenu}
                                                                           render={renderMenu}
                                                                           itemId={itemId}
                                                                           notLink={notLink}/>}
        </div>


    );
};

export default ButtonContainer;
import React, {FC} from 'react';
import s from "./buttonMenu.module.scss"
import classNames from "classnames";

interface IButtonMenu {
    render: any,
    notLink: string,
    placement?: "right" | "bottom"
}

const ButtonMenu:FC<IButtonMenu> = ({render,notLink,placement= "right"}) => {
    const classnames = classNames([`${s.menu}`], [`${notLink}`],s[placement])

    return (
        <div className={classnames}>
            {render()}
        </div>
    );
};

export default ButtonMenu;
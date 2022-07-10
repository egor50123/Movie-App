import React, {FC, useEffect} from 'react';
import s from "./buttonMenu.module.scss"
import classNames from "classnames";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import * as cardSelectors from "../../../../store/selectors/cardSelectors";

interface IButtonMenu {
    render: any,
    notLink: string,
    placement?: TMenuPlacement,
    btnClassName?: string,
    callback?: any,
    itemId?:number
}

export type TMenuPlacement = "right" | "bottom"

const ButtonMenu: FC<IButtonMenu> = ({render,itemId, notLink,callback, placement = "right", btnClassName}) => {
    const classnames = classNames([`${s.menu}`], [`${notLink}`], s[placement])
    const openListId = useTypedSelector(cardSelectors.updateOpenListId)

    function checkClick(e: MouseEvent) {
        let modal = ((e.target as HTMLElement)?.contains(document.body))
        let menu = (e.target as HTMLElement).closest(`.${s.menu}`)
        let button = (e.target as HTMLElement).closest(`.${btnClassName}`)
        const isOpen = ( menu || button || modal) &&
            (button?.id === String(openListId) || !button?.id)

        !isOpen && callback()
    }

    useEffect(() => {
        document.addEventListener("click", checkClick)
        return () => {
            document.removeEventListener("click", checkClick)
        }
    }, [])

    return (
        <div className={classnames}>
            {render()}
        </div>
    );
};

export default ButtonMenu;
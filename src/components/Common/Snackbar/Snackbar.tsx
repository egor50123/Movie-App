import React from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import s from "./snackbar.module.scss"
import classNames from "classnames";


const Snackbar = () => {
    const isOpen = useTypedSelector(state => state.account.snackbars.isOpen)
    const message = useTypedSelector(state => state.account.snackbars.message)

    const className = classNames({
        [`${s.root}`]: true,
        [`${s.root__active}`]: isOpen
    })


    return (
        <div>
            {<div className={className}>
                {message}
            </div>}
        </div>
    );
};

export default Snackbar;
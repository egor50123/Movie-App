import React, {FC, useState} from 'react';
import {Rating} from "@mui/material";
import {useAccountBtns} from "../../../../../hooks/useAccountBtns";
import {MTP_TYPES} from "../../../../../constants/constants";
import s from "../buttonMenu.module.scss"

interface IRateMenu {
    itemId:number,
    typeAPI: MTP_TYPES
}

const RateMenu:FC<IRateMenu> = ({itemId,typeAPI}) => {
    const {setRate} = useAccountBtns()
    const [rate, setRateState] = useState<number | null>(1)

    return (
        <div className={s.rateMenu}>
            <Rating
                size={"small"}
                precision={0.5}
                value={rate}
                onChange={(event, newValue) => {
                    event.preventDefault()
                    setRateState(newValue);
                    setRate({rate: newValue as number * 2, type: typeAPI, itemId})
                }}
            />
        </div>

    );
};

export default RateMenu;
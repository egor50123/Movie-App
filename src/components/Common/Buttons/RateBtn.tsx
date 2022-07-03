import React, {FC, useState} from 'react';
import styles from "../Card/card.module.scss";
import {IconButton, Rating, SvgIcon, Tooltip} from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {MT_TYPES} from "../../../constants/constants";
import {useAccountBtns} from "../../../hooks/useAccountBtns";

interface IRateBtn {
    typeAPI: MT_TYPES,
    itemId: number
    className: string
}

const RateBtn:FC<IRateBtn> = ({typeAPI,itemId,className}) => {
    const {setRate} = useAccountBtns()
    const [isRateMenuOpen, setRateMenu] = useState(false);
    const [rate, setRateState] = useState<number | null>(1)
    const onRate = (e: React.MouseEvent<Element, MouseEvent>): void => {
        e.preventDefault()
        setRateMenu(prev => !prev)
    }

    return (
        <div className={className}>
            <Tooltip title={"Оценить"} onClick={(e) => onRate(e)} placement={"right"}>
                <div>
                    <IconButton color={'default'} size={"small"}>
                        <SvgIcon sx={{fontSize: 15}} component={StarBorderOutlinedIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
            {isRateMenuOpen && <div className={styles.rateMenu}>
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
            </div>}
        </div>
    );
};

export default RateBtn;
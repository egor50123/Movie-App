import React, {FC, useEffect, useState} from 'react';
import s from "./categoriesFilter.module.scss";
import {Slider} from "@mui/material";

const RateFilter:FC<any> = ({setRef,isResetFilter}) => {
    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 10,
            label: '10',
        },
    ];

    const [rate, setRate] = useState<number[]>([0,100])

    const onRateChange = (event: Event, newValue: number | number[]) => {
        setRate(newValue as number[]);
    };

    useEffect(() => {
        setRate([0,10])
    },[isResetFilter])


    return (
        <div data-info={`${rate}`} ref={setRef} id={"rateFilter"}>
            <h2 className={s.title}>Рейтинг</h2>
            <div className={s.slider}>
                <div className={s.slider_box}>
                    <Slider
                        marks={marks}
                        min={0}
                        max={10}
                        step={0.1}
                        getAriaLabel={() => 'Temperature range'}
                        value={rate}
                        onChange={onRateChange}
                        valueLabelDisplay="auto"
                        size={'small'}
                    />
                </div>
            </div>
        </div>
    );
};

export default RateFilter;
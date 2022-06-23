import React, {FC, useEffect, useState} from 'react';
import s from "./categoriesFilter.module.scss";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const DateFilter:FC<any> = ({setRef,isResetFilter}) => {
    const [dateType,setDateType] = useState("1970-01-01,2023-12-28")

    function onSelect(e: SelectChangeEvent) {
        let target = e.target.value as string
        setDateType(target)
    }

    useEffect(() => {
        setDateType("1970-01-01,2023-12-28")
    },[isResetFilter])

    return (
        <div ref={setRef} data-info={dateType} id={"dateFilter"}>
            <h2 className={s.title}>Дата выхода</h2>
            <FormControl fullWidth>
                <InputLabel id="date">Год</InputLabel>
                <Select
                    labelId="date"
                    id="date"
                    value={dateType}
                    label="Год"
                    onChange={onSelect}
                >
                    <MenuItem value={`1970-01-01,2023-12-28`}>Все годы</MenuItem>
                    <MenuItem value={`2022-01-01,2023-12-28`}>2022</MenuItem>
                    <MenuItem value={`2021-01-01,2022-12-28`}>2021-2022</MenuItem>
                    <MenuItem value={`2020-01-01,2022-12-28`}>2020-2022</MenuItem>
                    <MenuItem value={`2019-01-01,2020-12-28`}>2019-2020</MenuItem>
                    <MenuItem value={`2010-01-01,2020-12-28`}>2010-2020</MenuItem>
                    <MenuItem value={`2010-01-01,2015-12-28`}>2010-2015</MenuItem>
                    <MenuItem value={`2000-01-01,2010-12-28`}>2000-2010</MenuItem>
                    <MenuItem value={`1990-01-01,2000-12-28`}>1990-2000</MenuItem>
                    <MenuItem value={`1980-01-01,1990-12-28`}>1980-1990</MenuItem>
                    <MenuItem value={`1980-01-01,1980-12-28`}>до 1980</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default DateFilter;
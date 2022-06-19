import React, {FC, useEffect, useState} from 'react';
import s from "./categoriesFilter.module.scss";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {CategoriesSortTypes} from "../../../models/categoriesM";

const DateFilter:FC<any> = ({setRef,isResetFilter}) => {
    const [dateType,setDateType] = useState("all")

    function onSelect(e: SelectChangeEvent) {
        let target = e.target.value as string
        setDateType(target)
    }

    useEffect(() => {
        setDateType("all")
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
                    <MenuItem value={`all`}>Все годы</MenuItem>
                    <MenuItem value={`2022`}>2022</MenuItem>
                    <MenuItem value={`2021-2022`}>2021-2022</MenuItem>
                    <MenuItem value={`2020-2022`}>2020-2022</MenuItem>
                    <MenuItem value={`2019-2020`}>2019-2020</MenuItem>
                    <MenuItem value={`2010-2020}`}>2010-2020</MenuItem>
                    <MenuItem value={`2010-2015`}>2010-2015</MenuItem>
                    <MenuItem value={`2000-2010`}>2000-2010</MenuItem>
                    <MenuItem value={`1990-2000`}>1990-2000</MenuItem>
                    <MenuItem value={`1980-1990`}>1980-1990</MenuItem>
                    <MenuItem value={`до 1980`}>до 1980</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default DateFilter;
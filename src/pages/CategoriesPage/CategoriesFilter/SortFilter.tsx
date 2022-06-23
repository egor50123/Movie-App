import React, {FC, useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {CategoriesSortTypes} from "../../../models/categoriesM";
import s from "./categoriesFilter.module.scss"

const SortFilter:FC<any> = ({setRef,isResetFilter}) => {
    let [sortType, setSortType] = useState<string>(CategoriesSortTypes.popularityDown)

    function onSelect(e: SelectChangeEvent) {
        let target = e.target.value as string
        setSortType(target)
    }

    useEffect(() => {
        setSortType(CategoriesSortTypes.popularityDown)
    },[isResetFilter])


    return (
        <div data-info={`${sortType}`} ref={setRef} id={"sortFilter"}>
            <h2 className={s.title}>Сортировать</h2>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Сортировать результаты по</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortType}
                    label="Сортировать результаты по"
                    onChange={onSelect}
                >
                    <MenuItem value={`${CategoriesSortTypes.popularityDown}`}>Попуярность (убывание)</MenuItem>
                    <MenuItem value={`${CategoriesSortTypes.popularityUp}`}>Попуярность (возрасстание)</MenuItem>
                    <MenuItem value={`${CategoriesSortTypes.releaseDown}`}>Дата выпуска (убывание)</MenuItem>
                    <MenuItem value={`${CategoriesSortTypes.releaseUp}`}>Дата выпуска (возрасстание)</MenuItem>
                    <MenuItem value={`${CategoriesSortTypes.voteAverageDown}`}>Рейтинг (убывание)</MenuItem>
                    <MenuItem value={`${CategoriesSortTypes.voteAverageUp}`}>Рейтинг (возрасстание)</MenuItem>
                </Select>
            </FormControl>
        </div>

    );
};

export default SortFilter;
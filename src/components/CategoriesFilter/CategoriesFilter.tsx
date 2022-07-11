import React, {FC, useEffect, useState} from "react";
import s from "./categoriesFilter.module.scss"
import SortFilter from "./SortFilter";
import RateFilter from "./RateFilter";
import GenresFilter from "./GenresFilter";
import DateFilter from "./DateFilter";
import {Link} from "react-router-dom";
import {useFilterData} from "../../hooks/useFilterData";
import {ICategoriesFilter} from "../../models/categoriesM";
import {useAction} from "../../hooks/useAction";

const CategoriesFilter: FC<ICategoriesFilter> = ({type,isResetFilter}) => {
    const [isFind,setFind] = useState(false)
    const {data,setRef} = useFilterData(isFind)
    const {categoriesFilterUpdate} = useAction()

    function onFind() {
        window.scrollTo(0, 0)
        setFind(true)
    }

    useEffect( () => {
        if (isFind) {
            setFind(false)
            categoriesFilterUpdate(data.current)
        }
    },[isFind])


    return (
        <div className={s.filter}>
            <div className={s.filter__item}>
                <SortFilter isResetFilter={isResetFilter} setRef={setRef}/>
            </div>
            <div className={s.filter__item}>
                <DateFilter isResetFilter={isResetFilter} setRef={setRef}/>
            </div>
            <div className={s.filter__item}>
                <GenresFilter isResetFilter={isResetFilter} setRef={setRef} type={type}/>
            </div>
            <div className={s.filter__item}>
                <RateFilter isResetFilter={isResetFilter} setRef={setRef}/>
            </div>
            <Link className={s.buttonSearch} onClick={onFind} to={`/${type}`}>Поиск</Link>
        </div>
    )
}

export default CategoriesFilter
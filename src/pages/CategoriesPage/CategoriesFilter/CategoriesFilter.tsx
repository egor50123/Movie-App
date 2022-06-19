import {ICategoriesFilter} from "../../../models/categoriesM";
import React, {FC, useState} from "react";
import s from "./categoriesFilter.module.scss"
import {useFilterData} from "../../../hooks/useFilterData";
import SortFilter from "./SortFilter";
import RateFilter from "./RateFilter";
import GenresFilter from "./GenresFilter";
import DateFilter from "./dateFilter";
import {Link} from "react-router-dom";

const CategoriesFilter: FC<ICategoriesFilter> = ({type,isResetFilter}) => {
    const [isReady,setReady] = useState(false)
    const {data,setRef} = useFilterData(isReady)


    function onFind() {
        window.scrollTo(0, 0)
        setReady(prev => !prev)
        console.log(data.current)
        //categoriesFilterUpdate(data)
    }

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
            <button className={s.buttonSearch} onClick={onFind}><Link to={`/${type}`}>Поиск</Link></button>
        </div>
    )
}

export default CategoriesFilter
import {Link} from "react-router-dom";
import {CategoriesSortTypes, FilterRangeNames, ICheckbox} from "../../../models/categoriesM";
import React, {FC, useEffect, useState} from "react";
import {setCheckbox} from "../../../helpers/setCheckbox";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {genreTypes} from "../../../store/types/mainPageT";
import {MTP, MTP_TYPES} from "../../../constants/constants";

export interface ICategoriesFilter {
    type: MTP_TYPES,
    withDefaultGenres?: boolean
}

const CategoriesFilter:FC<ICategoriesFilter> = ({type}) => {

    const {categoriesFilterUpdate, categoriesFilterReset} = useAction()

    const genresMovie = useTypedSelector(state => state.mainPage[genreTypes.genresMovie].payload),
        genresTv = useTypedSelector(state => state.mainPage[genreTypes.genresTv].payload)

    const currentGenres = type === MTP.movie ? genresMovie : genresTv

    let [sortType, setSortType] = useState(CategoriesSortTypes.popularityDown as string),
        [withGenres, setGenres] = useState(""),
        [checkboxes, setActive] = useState<ICheckbox>({}),
        [filterSettings, changeFilterSettings] = useState({
            [FilterRangeNames.minYear]: "",
            [FilterRangeNames.maxYear]: "",
            [FilterRangeNames.minRank]: "",
            [FilterRangeNames.maxRank]: "",
            [FilterRangeNames.minRuntime]: "",
            [FilterRangeNames.maxRuntime]: ""
        })


    function onCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        let {target, newGenres, isActive} = setCheckbox(e, withGenres)
        setGenres(newGenres)
        setActive({...checkboxes, [target]: isActive})
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        let targetId = e.target.id
        changeFilterSettings({
            ...filterSettings,
            [targetId]: e.target.value
        })
    }

    function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        let target = e.target.value
        setSortType(target)
    }

    function onFind() {
        window.scrollTo(0,0)
        categoriesFilterUpdate( getSettings() )
    }

    function getSettings () {
        return {...filterSettings, sortType, withGenres}
    }

    useEffect(() => {
        categoriesFilterReset()
        setActive({})
        setGenres("")
        setSortType(CategoriesSortTypes.popularityDown)
        return () => {
            categoriesFilterReset()
            setActive({})
            setGenres("")
            setSortType(CategoriesSortTypes.popularityDown)
        }
    },[type])

    return (
        <>
            <div>
                <button onClick={onFind}><Link to={`/${type}`}>поиск</Link></button>
            </div>
            <div className={'filter__item'}>
                <h2>сортировать</h2>
                <div>
                    <h3>сортировать по</h3>
                    <select className={"filter_select"} name="sort" id="1" onChange={onSelect}>
                        <option value={`${CategoriesSortTypes.popularityDown}`}>Попуярность (убывание)</option>
                        <option value={`${CategoriesSortTypes.popularityUp}`}>Попуярность (возрасстание)</option>
                        <option value={`${CategoriesSortTypes.releaseDown}`}>Дата выпуска (убывание)</option>
                        <option value={`${CategoriesSortTypes.releaseUp}`}>Дата выпуска (возрасстание)</option>
                        <option value={`${CategoriesSortTypes.voteAverageDown}`}>Рейтинг (убывание)</option>
                        <option value={`${CategoriesSortTypes.voteAverageUp}`}>Рейтинг (возрасстание)</option>
                    </select>
                </div>
            </div>
            <div className={'filter__item'}>
                <h2>Дата выхода</h2>
                <div>от <input type="text" id={FilterRangeNames.minYear} onChange={onChange}
                               value={filterSettings[FilterRangeNames.minYear]}/></div>
                <div>до <input type="text" id={FilterRangeNames.maxYear} onChange={onChange}
                               value={filterSettings[FilterRangeNames.maxYear]}/></div>
            </div>
            <div className={'filter__item'}>
                <h2>Жанры</h2>
                <div className={"genres"}>
                    {currentGenres?.map(item => <label key={item.id} id={item.id + ''}>
                            <input type="checkbox" id={item.id + ''} name={item.name} onChange={onCheckbox}
                                   checked={checkboxes[item.name] === undefined ? false : checkboxes[item.name]}/>
                            <span key={item.id} id={item.id + ''}>
                                {item.name}
                            </span>
                        </label>
                    )}
                </div>
            </div>
            <div className={'filter__item'}>
                <h2>рейтинг</h2>
                <div>min<input type="text" onChange={onChange} id={FilterRangeNames.minRank}
                               value={filterSettings[FilterRangeNames.minRank]}/></div>
                <div>max<input type="text" onChange={onChange} id={FilterRangeNames.maxRank}
                               value={filterSettings[FilterRangeNames.maxRank]}/></div>
            </div>
            <div className={'filter__item'}>
                <h2>минимальное количество голосов пользователей</h2>
                <div>min<input type="text"/></div>
            </div>
            <div className={'filter__item'}>
                <h2>Длительность</h2>
                <div>min<input type="text" onChange={onChange} id={FilterRangeNames.minRuntime}
                               value={filterSettings[FilterRangeNames.minRuntime]}/></div>
                <div>max<input type="text" onChange={onChange} id={FilterRangeNames.maxRuntime}
                               value={filterSettings[FilterRangeNames.maxRuntime]}/></div>
            </div>
            <div className={'filter__item'}>
                <h2>Ключевые слова</h2>
                <input type="text"/>
            </div>
        </>
    )
}

export default CategoriesFilter
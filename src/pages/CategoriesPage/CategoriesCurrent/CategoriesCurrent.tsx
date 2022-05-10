import React, {FC, useEffect, useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {CategoriesSortTypes, FilterRangeNames, ICategoriesPage, ICheckbox} from "../../../models/categoriesM";
import {Link, useParams} from "react-router-dom";
import {setCheckbox} from "../../../helpers/setCheckbox";
import Card from "../../../components/Common/Card/Card";
import {cardTypeAPI, cardTypes} from "../../../models/cardM";


const CategoriesCurrent: FC<ICategoriesPage> = ({type}) => {
    let {fetchCategoriesItems} = useAction(),
        params = useParams()

    let movieTv = useTypedSelector(state => state.categories.payload?.results),
        genres = useTypedSelector(state => state.mainPage.genres.payload)

    let withReleaseType = "3";
    let defaultGenres = params.genresId === undefined ? "" : `${params.genresId}|`

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
        let newSettings = {...filterSettings, type, sortType, withReleaseType, withGenres}
        fetchCategoriesItems(newSettings)
    }

    useEffect(() => {
        let newSettings = {...filterSettings, type, sortType, withReleaseType, withGenres: defaultGenres}
        fetchCategoriesItems(newSettings)
    }, [])

    useEffect(() => {
        if (params.genresId !== undefined) {
            let newSettings = {...filterSettings, type, sortType, withReleaseType, withGenres: defaultGenres}
            fetchCategoriesItems(newSettings)
        }
    }, [params.genresId])

    function onCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        let {target, newGenres, isActive} = setCheckbox(e, withGenres)
        setGenres(newGenres)
        setActive({...checkboxes, [target]: isActive})
    }

    return (
        <div className={"categoriesPage_col"}>
            <div className={"categoriesPage__filter filter"}>
                {type}
                <div>

                    <button onClick={onFind}><Link to={"/movie"}>поиск</Link></button>
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
                        {genres?.map(item => <label key={item.id} id={item.id + ''}>
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
                    <h2>минимальное количкство голосов пользователей</h2>
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
            </div>
            <div className={"categoriesPage__list categoriesList"}>
                {movieTv?.map(item =>
                    <Card title={item.title}
                          overview={item.overview}
                          id={item.id}
                          vote={item.vote_average}
                          bg_path={item.poster_path || item.backdrop_path}
                          genres={item.genre_ids}
                          typeAPI={item.title === undefined ? cardTypeAPI.tv : cardTypeAPI.movie}
                          type={cardTypes.type_1} date={item.release_date}/>
                )}
            </div>
        </div>
    );
};

export default CategoriesCurrent;
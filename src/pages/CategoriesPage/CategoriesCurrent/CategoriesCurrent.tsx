import React, {FC, useEffect, useRef, useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {CategoriesSortTypes, FilterRangeNames, ICategoriesPage, ICheckbox} from "../../../models/categoriesM";
import {Link, useParams} from "react-router-dom";
import {setCheckbox} from "../../../helpers/setCheckbox";
import Card from "../../../components/Common/Card/Card";
import {cardTypeAPI, cardTypes} from "../../../models/cardM";
import {genreTypes} from "../../../store/types/mainPageT";
import {MTP} from "../../../constants/constants";
import {useScroll} from "../../../hooks/useScroll";


const CategoriesCurrent: FC<ICategoriesPage> = ({type}) => {
    const {fetchCategoriesItems,clearCategories} = useAction(),
        params = useParams()

    const childRef = useRef<null | HTMLDivElement>(null)

    const movieTv = useTypedSelector(state => state.categories.payloadResults),
        genresMovie = useTypedSelector(state => state.mainPage[genreTypes.genresMovie].payload),
        genresTv = useTypedSelector(state => state.mainPage[genreTypes.genresTv].payload),
        page = useTypedSelector(state => state.categories.nextPage)

    const currentGenres = type === MTP.movie ? genresMovie : genresTv

    //let defaultGenres = params.genresId === undefined ? "" : `${params.genresId}|`

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

    const intersected = useScroll(childRef,() => fetchCategoriesItems( getSettings()) )


    function getSettings (isClear = false) {
        return {...filterSettings, type, sortType, withGenres: withGenres, page, isClear}
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
        clearCategories()
        fetchCategoriesItems( getSettings())
    }

    useEffect(() => {
        clearCategories()
        fetchCategoriesItems(getSettings())
        return () => {
            clearCategories()
        }
    }, [params.genresId,type])

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
                {movieTv.length > 0 ? movieTv.map(item =>
                    <Card key={item.id} title={item.title || item.name}
                          overview={item.overview}
                          id={item.id}
                          vote={item.vote_average}
                          bg_path={item.poster_path || item.backdrop_path}
                          genres={item.genre_ids}
                          typeAPI={item.title === undefined ? cardTypeAPI.tv : cardTypeAPI.movie}
                          type={cardTypes.type_1} date={item.release_date || item.first_air_date}/>
                ) : <div className={"test"}></div>}
            </div>
            <div ref={childRef} style={{height: 20, background: "red"}}/>
        </div>
    );
};

export default CategoriesCurrent;
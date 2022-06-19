import React, {FC, useEffect, useRef, useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICategoriesPage} from "../../../models/categoriesM";
import {useParams} from "react-router-dom";
import Card from "../../../components/Common/Card/Card";
import {cardTypes} from "../../../models/cardM";
import {useScroll} from "../../../hooks/useScroll";
import {MTP, MTP_TYPES} from "../../../constants/constants";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import s from "./categoriesCurrent.module.scss"
import * as selectors from "../../../store/selectors/categoriesPageSelectors"

const CategoriesCurrent: FC<ICategoriesPage> = ({type}) => {
    const {fetchCategoriesItems,clearCategories} = useAction()
    const params = useParams()
    const defaultGenres = params.genresId === undefined ? "" : `${params.genresId}|`

    const filterSettings = useTypedSelector(selectors.categoriesFilter)
    const movieTv = useTypedSelector(selectors.payload)
    const isLoading = useTypedSelector(selectors.isLoading)
    const nextPage = useTypedSelector(selectors.nextPage)

    const childRef = useRef<null | HTMLDivElement>(null)

    function getSettings (type:MTP_TYPES,filterSettings:any,genres = "",page:number)  {
        if (genres !== "") {
            return {...filterSettings, withGenres: genres, type, page}
        } else {
            return {...filterSettings, type, page}
        }
    }
    const [isResetFilter,resetFilter] = useState(false)

    useScroll(childRef,() => fetchCategoriesItems( getSettings(type,filterSettings,defaultGenres,nextPage)),isLoading )

    useEffect(() => {
        clearCategories()
        fetchCategoriesItems(getSettings(type,filterSettings,defaultGenres,1))
        console.log("fetch from Effect")
        resetFilter(prev => !prev)
        return () => {
            clearCategories()
        }
    }, [defaultGenres,type,filterSettings])



    return (
        <div className={s.root}>
            <div className={s.filterBox}>
                <CategoriesFilter isResetFilter={isResetFilter} type={type}/>
            </div>
            <div className={s.main}>
                {movieTv.length > 0 ? movieTv.map(item =>
                    <Card key={item.id} title={item.title || item.name}
                          overview={item.overview}
                          id={item.id}
                          vote={item.vote_average}
                          bg_path={item.poster_path || item.backdrop_path}
                          genres={item.genre_ids}
                          typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                          type={cardTypes.type_1} date={item.release_date || item.first_air_date}/>
                ) : <div className={s.test}></div>}
            </div>
            <div ref={childRef} style={{height: 20, background: "red"}}/>
        </div>

    );
};

export default CategoriesCurrent;
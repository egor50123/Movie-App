import React, {FC, useEffect, useRef, useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICategoriesPage} from "../../../models/categoriesM";
import {useParams} from "react-router-dom";
import Card from "../../../components/Common/Card/Card";
import {useScroll} from "../../../hooks/useScroll";
import {MTP, MTP_TYPES} from "../../../constants/constants";
import s from "./categoriesCurrent.module.scss"
import * as selectors from "../../../store/selectors/categoriesPageSelectors"
import SmallCard from "../../../components/Common/Card/SmallCard/SmallCard";
import CategoriesFilter from "../../../components/CategoriesFilter/CategoriesFilter";

const CategoriesCurrent: FC<ICategoriesPage> = ({type}) => {
    const {fetchCategoriesItems,clearCategories} = useAction()
    const params = useParams()
    const defaultGenres = params.genresId === undefined ? "" : `${params.genresId}|`

    const filterSettings = useTypedSelector(selectors.categoriesFilter)
    const movieTv = useTypedSelector(selectors.payload)
    const isLoading = useTypedSelector(selectors.isLoading)
    const nextPage = useTypedSelector(selectors.nextPage)
    const isEnd = useTypedSelector(selectors.isEnd)

    const childRef = useRef<null | HTMLDivElement>(null)

    function getSettings (type:MTP_TYPES,filterSettings:any,genres = "",page:number)  {
        if (genres !== "") {
            return {...filterSettings, withGenres: genres, type, page}
        } else {
            return {...filterSettings, type, page}
        }
    }
    const [isResetFilter,resetFilter] = useState(false)

    useScroll(childRef,() => fetchCategoriesItems( getSettings(type,filterSettings,defaultGenres,nextPage)),isLoading,isEnd )

    useEffect(() => {
        clearCategories()
        fetchCategoriesItems(getSettings(type,filterSettings,defaultGenres,1))
        return () => {
            clearCategories()
        }
    }, [defaultGenres,type,filterSettings])

    useEffect(() => {
        resetFilter(prev => !prev)
    },[type,params.genresId])



    return (
        <div className={s.root}>
            <div className={s.filterBox}>
                <CategoriesFilter isResetFilter={isResetFilter} type={type}/>
            </div>
            <div className={s.main}>
                {movieTv.length > 0 ? movieTv.map(item =>
                    <Card id={item.id}
                          key={item.id}
                          typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                          renderCard={() => <SmallCard  key={item.id} id={item.id}
                                                        title={item.title as string || item.name as string}
                                                        typeAPI={item.title === undefined ? MTP.tv : MTP.movie }
                                                        bg_path={item.poster_path}
                                                        overview={item.overview}
                                                        vote={item.vote_average}
                                                        date={item.release_date as string || item.first_air_date as string}
                                                        country={item.origin_country}
                                                        genres={item.genre_ids}/>}/>
                ) : <div className={s.test}></div>}
            </div>
            {<div ref={childRef} style={{height: 20, background: "red"}}/>}
        </div>

    );
};

export default CategoriesCurrent;
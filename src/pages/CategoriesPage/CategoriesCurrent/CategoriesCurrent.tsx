import React, {FC, useEffect, useRef} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ICategoriesPage} from "../../../models/categoriesM";
import {useParams} from "react-router-dom";
import Card from "../../../components/Common/Card/Card";
import {cardTypeAPI, cardTypes} from "../../../models/cardM";
import {useScroll} from "../../../hooks/useScroll";
import {categoriesFilter, payload} from "../../../store/selectors/categoriesPageSelectors";
import {MTP_TYPES} from "../../../constants/constants";



const CategoriesCurrent: FC<ICategoriesPage> = ({type}) => {
    const {fetchCategoriesItems,clearCategories} = useAction()
    const params = useParams()
    const defaultGenres = params.genresId === undefined ? "" : `${params.genresId}|`

    const filterSettings = useTypedSelector(categoriesFilter)
    const movieTv = useTypedSelector(payload)
    const nextPage = useTypedSelector(state => state.categories.nextPage)

    const childRef = useRef<null | HTMLDivElement>(null)

    function getSettings (type:MTP_TYPES,filterSettings:any,genres = "",page:number)  {
        if (genres !== "") {
            return {...filterSettings, withGenres: genres, type, page}
        } else {
            return {...filterSettings, type, page}
        }
    }

    useScroll(childRef,() => fetchCategoriesItems( getSettings(type,filterSettings,defaultGenres,nextPage)) )

    useEffect(() => {
        clearCategories()
        fetchCategoriesItems(getSettings(type,filterSettings,defaultGenres,1))
        return () => {
            clearCategories()
        }
    }, [defaultGenres,type,filterSettings])


    return (
        <div>
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
import {Link} from "react-router-dom";
import React, {FC} from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {genreTypes} from "../../../../store/types/mainPageT";
import {useAction} from "../../../../hooks/useAction";
import s from "../header.module.scss"

const CategoriesList: FC = () => {
    const genresMovie = useTypedSelector(state => state.mainPage[genreTypes.genresMovie].payload),
        genresTv = useTypedSelector(state => state.mainPage[genreTypes.genresTv].payload)

    const {categoriesFilterReset} = useAction()

    function resetFilter() {
        window.scrollTo(0, 0)
        categoriesFilterReset()
    }

    return (
        <>
            <div id={"movie"} data-item={"movie"} className={s.header__categoriesItem}>
                <Link to={`/movie`} onClick={resetFilter}>Фильмы</Link>
                {genresMovie && <ul className={s.header__list}>
                    {genresMovie.map(item => <li className={s.list__items} key={`g${item.id}`} onClick={resetFilter}>
                        <Link to={`/movie/genres/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>)}
                </ul>}
            </div>
            <div id={"tv"} data-item={"tv"} className={s.header__categoriesItem}>
                <Link to={`/tv`} onClick={resetFilter}>Сериалы</Link>
                {genresTv && <ul className={s.header__list}>
                    {genresTv.map(item => <li className={s.list__items} key={`g${item.id}`} onClick={resetFilter}>
                        <Link to={`/tv/genres/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>)}
                </ul>}
            </div>
            <div id={"people"} data-item={"people"} className={s.header__categoriesItem}>
                <Link to={`/people`}>Люди</Link>
            </div>
        </>
    )
}

export default CategoriesList
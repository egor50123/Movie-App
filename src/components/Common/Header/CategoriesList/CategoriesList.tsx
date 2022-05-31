import {Link} from "react-router-dom";
import React, {FC} from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {genreTypes} from "../../../../store/types/mainPageT";

const CategoriesList:FC = () => {
    const genresMovie = useTypedSelector(state => state.mainPage[genreTypes.genresMovie].payload),
          genresTv = useTypedSelector(state => state.mainPage[genreTypes.genresTv].payload)

    return (
        <>
            <div id={"movie"} data-item={"movie"} className={"header__categories-item"}>
                <Link to={`/movie`}>Фильмы</Link>
                { genresMovie && <ul className={"header__list"}>
                    {genresMovie.map(item => <li key={`g${item.id}`}>
                        <Link to={`/movie/genres/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>)}
                </ul>}
            </div>
            <div id={"tv"} data-item={"tv"} className={"header__categories-item"}>
                <Link to={`/tv`}>Сериалы</Link>
                { genresTv && <ul className={"header__list"}>
                    {genresTv.map(item => <li key={`g${item.id}`}>
                        <Link to={`/tv/genres/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>)}
                </ul>}
            </div>
            <div id={"people"} data-item={"people"} className={"header__categories-item"}>
                <Link to={`/people`}>Люди</Link>
            </div>
        </>
    )
}

export default CategoriesList
import React, {useEffect, useState} from 'react';
import "./Header.scss"
import {Link} from "react-router-dom";
import logo from "../../../assest/image/logo.svg"
import Search from "../Search/Search";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {genreTypes} from "../../../store/types/mainPageT";

const Header = () => {
    let isAuth = useTypedSelector(state => state.auth.session.payload?.success)
    const movie = "movie",
            tv = "tv",
            people = "people"

    const genresMovie = useTypedSelector(state => state.mainPage[genreTypes.genresMovie].payload),
        genresTv = useTypedSelector(state => state.mainPage[genreTypes.genresTv].payload)
    let token = useTypedSelector(state => state.auth.payload?.request_token)
    let session = useTypedSelector(state => state.auth.session.payload?.session_id)

    let {fetchGenres,deleteSession} = useAction()

    useEffect(() => {
        fetchGenres(genreTypes.genresTv)
        fetchGenres(genreTypes.genresMovie)
    },[])

    function onLogOut() {
        console.log(session)
        if (session) deleteSession(session)
    }

    return (
        <div className={"header"}>
            <div className={"header__left"}>
                <Link className={"header__logo"} to={""}><img src={logo} alt="" width={180} height={50}/></Link>
                <div className={"header__categories"}>
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
                </div>
            </div>
            <div className={"header__right"}>
                <div className={"header__search"}>
                    <Search/>
                </div>

                {!isAuth ? <a rel="noreferrer" href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/auth`}
                    target="_blank">Войти</a> :
                    <Link to={"/profile"} className={"header__profile"}>
                        <span>Garrus</span>
                        <button onClick={onLogOut}>Выйти</button>
                    </Link>}
            </div>
        </div>
    );
};

export default Header;
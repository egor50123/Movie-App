import React, {useEffect, useState} from 'react';
import "./Header.scss"
import {Link} from "react-router-dom";
import logo  from "../../../assest/image/logo.svg"
import Search from "../Search/Search";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {MainPageState} from "../../../store/types/mainPageT";
import {useAction} from "../../../hooks/useAction";

const Header = () => {
    let [currentCategory,setCategory] = useState<string | null>(null)
    let isAuth = useTypedSelector(state => state.auth.session.payload?.success)
    const movie = "movie",
            tv = "tv",
            people = "people"

    let genres = useTypedSelector(state => (state.mainPage as MainPageState).genres.payload)
    let token = useTypedSelector(state => state.auth.payload?.request_token)
    let session = useTypedSelector(state => state.auth.session.payload?.session_id)

    let {fetchGenres,deleteSession} = useAction()
    function onHover(e:React.MouseEvent<HTMLDivElement>) {
        let target = (e.target as Element).closest(".header__categories-item")
        if (target !== null) setCategory(target.id)
    }

    function onLeave(e:React.MouseEvent<HTMLDivElement>) {
        let target = (e.target as Element).closest(".header__categories-item")
        if (target !== null) setCategory(null)
    }

    useEffect(() => {
        fetchGenres()
    },[])

    function onLogOut() {
        console.log(session)
        if (session) deleteSession(session)
    }

    return (
        <div className={"header"}>
            <div className={"header__left"}>
                <Link className={"header__logo"} to={""}><img src={logo} alt="" width={180} height={50}/></Link>
                <div className={"header__categories"} onMouseOver={onHover} onMouseLeave={onLeave}>
                    <div id={"movie"} className={"header__categories-item"}>
                        <Link to={`/movie`}>Фильмы</Link>
                        { genres && currentCategory === movie && <ul className={"header__list"}>
                                {genres.map(item => <li key={`g${item.id}`}>
                                    <Link to={`/movie/genres/${item.id}`}>
                                        {item.name}
                                    </Link>
                                </li>)}
                        </ul>}
                    </div>
                    <div id={"tv"} className={"header__categories-item"}>
                        <span>Сериалы</span>
                        { currentCategory === tv && <ul className={"header__list"}>
                            <li><Link to={"/tv"}>Популярные</Link></li>
                            <li><Link to={"/tv/best"}>Лучшие</Link></li>
                        </ul>}
                    </div>
                    <div id={"people"} className={"header__categories-item"}>
                        <span>Люди</span>
                        {currentCategory === people && <ul className={"header__list"}>
                            <li>Популярные</li>
                        </ul>}
                    </div>
                </div>
            </div>
            <div className={"header__right"}>
                <div className={"header__search"}>
                    <Search/>
                </div>
                {!isAuth ? <a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/auth`}
                    target="_blank">Войти CS</a> :
                    <div>
                        <span>Garrus</span>
                        <button onClick={onLogOut}>Выйти</button>
                    </div>}
                {/*{isAuth ? <div>*/}
                {/*    <span>Garrus</span>*/}
                {/*    <button onClick={onLogOut}>Выйти</button>*/}
                {/*</div> : <div>*/}
                {/*    <a href="https://www.themoviedb.org/signup" target="_blank">Sign Up</a>*/}
                {/*    <Link to={"/auth"}>Войти</Link>*/}
                {/*</div>}*/}
            </div>
        </div>
    );
};

export default Header;
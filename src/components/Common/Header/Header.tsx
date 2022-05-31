import React, {useEffect} from 'react';
import "./Header.scss"
import {Link} from "react-router-dom";
import logo from "../../../assest/image/logo.svg"
import Search from "../Search/Search";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {genreTypes} from "../../../store/types/mainPageT";
import CategoriesList from "./CategoriesList/CategoriesList";
import * as authSelectors from "../../../store/selectors/authSelecors";

const Header = () => {
    const isAuth = useTypedSelector(authSelectors.isAuth)
    const token = useTypedSelector(authSelectors.token)
    const session = useTypedSelector(authSelectors.session)

    let {fetchGenres,deleteSession} = useAction()

    useEffect(() => {
        fetchGenres(genreTypes.genresTv)
        fetchGenres(genreTypes.genresMovie)
    },[])

    function onLogOut() {
        if (session) deleteSession(session)
    }

    return (
        <div className={"header"}>
            <div className={"header__left"}>
                <Link className={"header__logo"} to={""}><img src={logo} alt="" width={180} height={50}/></Link>
                <div className={"header__categories"}>
                    <CategoriesList/>
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
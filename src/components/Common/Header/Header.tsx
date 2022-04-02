import React from 'react';
import "./Header.scss"
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={"header"}>
            <Link to={""}>home</Link>
            <div className={"header__films"}>
                <Link to={"/movie"}>Фильмы популярные</Link>
                <Link to={"/movie/best"}>Фильмы лучшие</Link>
            </div>
            <div className={"header__tv"}>
                <Link to={"/tv"}>Сериалы популярные</Link>
                <Link to={"/tv/best"}>Сериалы лучшие</Link>
            </div>
            <Link to={"/auth"}>Войти</Link>
        </div>
    );
};

export default Header;
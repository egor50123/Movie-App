import React from 'react';
import "./SearchPage.scss"
import {Link, Outlet} from "react-router-dom";

const SearchPage = () => {
    return (
        <>
            <div className={"searchPage container"}>
                <div className={"searchPage__menu"}>
                    <ul>
                        <li><Link to={""}>Фильмы</Link></li>
                        <li>Люди</li>
                        <li><Link to={"tv"}>Сериалы</Link></li>
                        <li>Компании</li>
                        <li>Ключевые слова</li>
                        <li>Коллекции</li>
                        <li>Телесети</li>
                    </ul>
                </div>
                <div className={"searchPage__list"}>
                    <Outlet/>
                </div>
            </div>
        </>

    );
};

export default SearchPage;
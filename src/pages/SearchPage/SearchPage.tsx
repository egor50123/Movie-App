import React from 'react';
import "./SearchPage.scss"
import {Link, Outlet} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {MTP} from "../../constants/constants";

const SearchPage = () => {

    const pageData = useTypedSelector( state => state.searchPage)

    return (
        <>
            <div className={"searchPage container"}>
                <div className={"searchPage__menu"}>
                    <ul>
                        <li>
                            <Link to={""}>
                                <div>Фильмы</div>
                                <div>{pageData.movie.payload?.total_results} </div>
                            </Link>
                        </li>
                        <li >
                            <Link to={MTP.tv}>
                                <div>Сериалы</div>
                                <div>{pageData.tv.payload?.total_results} </div>
                            </Link>
                        </li>
                        <li >
                            <Link to={MTP.person}>
                                <div>Люди</div>
                                <div>{pageData.person.payload?.total_results} </div>
                            </Link>
                        </li>
                        <li>Коллекции</li>
                    </ul>
                </div>
                <div >
                    <Outlet/>
                </div>
            </div>
        </>

    );
};

export default SearchPage;
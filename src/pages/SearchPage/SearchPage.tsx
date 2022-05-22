import React from 'react';
import "./SearchPage.scss"
import {Link, Outlet} from "react-router-dom";
import {useAction} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const SearchPage = () => {
    const text = useTypedSelector(state => state.search.text)
    const {fetchSearch} = useAction()

    function onFetch(type: string,text:string) {
        fetchSearch(text, type)
    }

    return (
        <>
            <div className={"searchPage container"}>
                <div className={"searchPage__menu"}>
                    <ul>
                        <li onClick={() => onFetch("movie",text)}><Link to={""}>Фильмы</Link></li>
                        <li onClick={() => onFetch("tv",text)}><Link to={"tv"}>Серииалы</Link></li>
                        <li onClick={() => onFetch("person",text)}><Link to={"person"}>Люди</Link></li>
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
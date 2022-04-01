import React from 'react';
import "./SearchPage.scss"

const SearchPage = () => {
    return (
        <div className={"searchPage"}>
            <div className={"searchPage__menu"}>
                <ul>
                    <li>Фильмы</li>
                    <li>Люди</li>
                    <li>Сериалы</li>
                    <li>Компании</li>
                    <li>Ключевые слова</li>
                    <li>Коллекции</li>
                    <li>Телесети</li>
                </ul>
            </div>
            <div className={"searchPage__list"}>

            </div>
        </div>
    );
};

export default SearchPage;
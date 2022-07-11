import React, {useState} from 'react';
import "./searchPage.module.scss"
import {Link, Outlet} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {MTP} from "../../constants/constants";
import s from "./searchPage.module.scss"
import classNames from "classnames";
import {searchPage, searchValue} from "../../store/selectors/commonSelectors";

const SearchPage = () => {

    const pageData = useTypedSelector( searchPage)
    const searchText = useTypedSelector(searchValue)

    const [currentActive,setActive] = useState("1")



    function setCurrent (value:string) {
        return classNames({
            [`${s.listItem}`]: true,
            [`${s.listItem__active}`]: +value === +currentActive
        })
    }

    function onclick(e:React.MouseEvent) {
        let target = (e.target as HTMLDivElement).closest(`.${s.listItem}`)
        if (target) {
            let value:string = (target as HTMLDivElement).dataset.number as string
            setActive(value)
        }
    }
    return (
        <>
            <div className={s.searchPage}>
                <div className={s.box}>
                    <h1>Результаты поиска</h1>
                    <div className={s.searchPage__menu}>
                        <ul className={s.list} onClick={onclick}>
                            <li data-number={"1"} className={setCurrent("1")}>
                                <Link to={""}>
                                    <div>Фильмы</div>
                                    <div>{pageData.movie.payload?.total_results} </div>
                                </Link>
                            </li>
                            <li data-number={"2"} className={setCurrent("2")}>
                                <Link to={MTP.tv}>
                                    <div>Сериалы</div>
                                    <div>{pageData.tv.payload?.total_results} </div>
                                </Link>
                            </li>
                            <li data-number={"3"} className={setCurrent("3")}>
                                <Link to={MTP.person}>
                                    <div>Люди</div>
                                    <div>{pageData.person.payload?.total_results} </div>
                                </Link>
                            </li>
                            {/*<li className={s.listItem}>Коллекции</li>*/}
                        </ul>
                    </div>
                </div>

                <div >
                    <h3>Результаты по запросу "{searchText}"</h3>
                    <Outlet/>
                </div>
            </div>
        </>

    );
};

export default SearchPage;
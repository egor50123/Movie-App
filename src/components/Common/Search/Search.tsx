import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {Link, NavLink} from "react-router-dom";
import "./Search.scss"

const Search = () => {
    const {films,isLoading,error} = useTypedSelector(state => state.search)
    const {fetchSearchFilms,clearSearch} = useAction()
    let [value,setValue] = useState('')

    useEffect( () => {
        value === "" ? clearSearch() : fetchSearchFilms(value)
    },[value])

    function onChange(e:React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        setValue(value)
    }

    return (
        <div className={"search"}>
            <input placeholder={"поиск..."} type="search" onChange={onChange} value={value}/>
            <NavLink to={"/search"}>o</NavLink>
            <div className={"search__list"}>
                {!isLoading ? films.map(film =>
                    <div key={film.id}> {film.title}</div>
                ): <span>loading</span>}
            </div>
        </div>
    );
};

export default Search;
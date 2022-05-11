import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {NavLink} from "react-router-dom";
import "./Search.scss"
import SearchItem from "./SearchItem";

const Search = () => {
    const {payload,isLoading} = useTypedSelector(state => state.search)
    const {fetchSearchFilms,clearSearch} = useAction()
    let [value,setValue] = useState('')
    const listRef = useRef(null)

    const onClose = useCallback(() => {
        if (listRef.current) (listRef.current as HTMLDivElement).style.display = "none"
    },[])

    useEffect(()=> {
        document.addEventListener("click", onClose)
    },[])

    useEffect( () => {
        value === "" ? clearSearch() : fetchSearchFilms(value)
        if (listRef.current) (listRef.current as HTMLDivElement).style.display = "flex"
    },[value])

    function onChange(e:React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        setValue(value)
    }

    return (
        <div className={"search"}>
            <input placeholder={"поиск..."} type="search" onChange={onChange} value={value}/>
            <NavLink to={"/search"}>o</NavLink>
            <div ref={listRef} className={"search__list"}>
                {!isLoading ?
                    typeof payload?.results === "object" && (payload?.results as any[]).length === 0 ? <span>Ничего не нашлось</span> :
                    payload?.results.map(item => <SearchItem data={item}/>) :
                    <span>Загрузка</span>}
            </div>
            <button onClick={onClose}>close</button>
        </div>
    );
};

export default Search;
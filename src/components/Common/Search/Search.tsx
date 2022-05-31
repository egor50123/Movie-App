import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {NavLink, useNavigate} from "react-router-dom";
import "./Search.scss"
import SearchItem from "./SearchItem";
import {useDebounce} from "../../../hooks/useDebounce";
import {MTP} from "../../../constants/constants";

const Search = () => {
    const {payload,isLoading,error} = useTypedSelector(state => state.search)
    const {fetchSearch,clearSearch,fetchItemSearchPage} = useAction()
    const fetchSearchDebounce = useDebounce(fetchSearch,200)
    let navigate = useNavigate()

    let [value,setValue] = useState('')
    const listRef = useRef(null)
    const inputRef = useRef<null | HTMLInputElement>(null)

    const onClose = useCallback(() => {
        if (listRef.current) (listRef.current as HTMLDivElement).style.display = "none"
    },[])

    useEffect(()=> {
        document.addEventListener("click", onClose)
        inputRef.current?.addEventListener("keydown", (e:KeyboardEvent) => {
            let value = inputRef.current?.value as string
            if (e.code === "Enter" && value !== "") {
                navigate("./search")
                onClose()
                fetchItemSearchPage(value, MTP.movie)
                fetchItemSearchPage(value, MTP.tv)
                fetchItemSearchPage(value, MTP.person)
            }
        })
    },[])

    useEffect( () => {
        value === "" ? clearSearch() : fetchSearchDebounce(value)
        if (listRef.current) (listRef.current as HTMLDivElement).style.display = "flex"
    },[value])

    function onChange(e:React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        setValue(value)
    }

    function getSearchResults() {
        fetchItemSearchPage(value, MTP.movie)
        fetchItemSearchPage(value, MTP.tv)
        fetchItemSearchPage(value, MTP.person)
    }


    return (
        <div className={"search"}>
            <input ref={inputRef} placeholder={"поиск..."} type="search" onChange={onChange} value={value}/>
            <NavLink to={"/search"} onClick={getSearchResults}>Найти</NavLink>
            <div ref={listRef} className={"search__list"}>
                {!isLoading ?
                    error ? <span>Ничего не нашлось</span> :
                        payload?.results.map(item => <SearchItem key={item.id}  data={item}/>) :
                    <span>Загрузка</span>}
            </div>
            <button onClick={onClose}>close</button>
        </div>
    );
};

export default Search;
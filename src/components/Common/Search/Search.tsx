import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {NavLink, useNavigate} from "react-router-dom";
import SearchItem from "./SearchItem";
import {useDebounce} from "../../../hooks/useDebounce";
import {MTP} from "../../../constants/constants";
import SearchIcon from '@mui/icons-material/Search';
import s from "./search.module.scss"

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

    useEffect( () => {
        if (listRef.current) (listRef.current as HTMLDivElement).style.display = "none"
    },[])

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
        <div className={s.search}>
            <div className={s.inputBox}>
                <input ref={inputRef} className={s.input} placeholder={"поиск..."} type="search" onChange={onChange} value={value}/>
                <NavLink to={"/search"} className={s.searchIcon} onClick={getSearchResults}><SearchIcon/></NavLink>
            </div>

            <div ref={listRef} className={s.search__list_box}>
                <div className={s.search__list}>
                    {!isLoading ?
                        error ? <span >Ничего не нашлось</span> :
                            payload?.results.map(item => <SearchItem key={item.id}  data={item}/>) :
                        <span>Загрузка...</span>}
                </div>

            </div>
        </div>
    );
};

export default Search;
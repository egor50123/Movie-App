import React, {useCallback, useRef} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {NavLink} from "react-router-dom";
import SearchItem from "./SearchItem";
import {MTP} from "../../../constants/constants";
import SearchIcon from '@mui/icons-material/Search';
import s from "./search.module.scss"
import useSearch from "../../../hooks/useSearch";
import {getSearch} from "../../../store/selectors/mainPageSelectors";

const Search = () => {
    const {payload,isLoading,error} = useTypedSelector(getSearch)
    const {fetchItemSearchPage} = useAction()
    const listRef = useRef(null)
    const inputRef = useRef<null | HTMLInputElement>(null)
    const [value, onChange] = useSearch({listRef: listRef.current,inputRef:inputRef.current})

    const getSearchResults = useCallback(() => {
        fetchItemSearchPage(value, MTP.movie)
        fetchItemSearchPage(value, MTP.tv)
    },[value])


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
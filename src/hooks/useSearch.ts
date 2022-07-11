import React, {useCallback, useEffect, useState} from 'react';
import {MTP} from "../constants/constants";
import {useAction} from "./useAction";
import {useDebounce} from "./useDebounce";
import {useNavigate} from "react-router-dom";
import {IUseSearch} from "../models/hooksM";

const useSearch = ({inputRef, listRef}:IUseSearch) => {
    const [value,setValue] = useState('')
    const {fetchSearch,clearSearch,fetchItemSearchPage,saveLastValue} = useAction()
    const fetchSearchDebounce = useDebounce(fetchSearch,300)
    const navigate = useNavigate()

    const onClose = useCallback(() => {
        if (listRef) listRef.style.display = "none"
    },[listRef])

    useEffect(()=> {
        onClose()
        document.addEventListener("click", onClose)
        inputRef?.addEventListener("keydown", (e:KeyboardEvent) => {
            let value = inputRef?.value as string
            if (e.code === "Enter" && value !== "") {
                navigate("./search")
                clearSearch()
                saveLastValue(value)
                setValue("")
                onClose()
                fetchItemSearchPage(value, MTP.movie)
                fetchItemSearchPage(value, MTP.tv)
            }
        })
    },[inputRef])

    useEffect( () => {
        if (value === "") {
            clearSearch()
            onClose()
        } else fetchSearchDebounce(value)

        if (listRef && value !== "") listRef.style.display = "flex"
    },[value])

    function onChange(e:React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        setValue(value)
    }

    return [value,onChange] as const
};

export default useSearch;
import {useCallback, useRef} from "react";
import {filterData} from "../models/filterM";

export const useFilterData = (ifFind:boolean) => {
    const data = useRef<filterData>({})

    const setData = (element:HTMLElement) => {
        if (!element) return

        let info = element.dataset.info
        let id = element.id
        // @ts-ignore
        data.current[id] = info
    }

    const setRef = useCallback( (element:HTMLElement) => {
        if (ifFind) {
            setData(element)
        }
    },[ifFind])

    return {data,setRef}
}
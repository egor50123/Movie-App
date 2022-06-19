import {useCallback, useRef} from "react";

interface IFilter {
    [index:string]: string
}

export const useFilterData = (isReady:boolean) => {
    const data = useRef<IFilter>({})

    const setData = (element:HTMLElement) => {
        if (!element) return

        let info = element.dataset.info as string
        let id:string = element.id
        data.current[id] = info
    }

    const setRef = useCallback( (element) => {
        setData(element)
    },[isReady])

    return {data,setRef}
}
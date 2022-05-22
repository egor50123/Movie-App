import {Dispatch, useCallback, useRef} from "react";

type callbackType = (text:string, type:string) => Dispatch<any>

export const useDebounce = (callback:callbackType, delay:number) => {
    let timer = useRef(null);

    return useCallback((value,type) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        (timer.current as any) = setTimeout(() => {

            callback(value,type)
        }, delay)
    }, [callback, delay])

}
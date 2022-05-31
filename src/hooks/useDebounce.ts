import {Dispatch, useCallback, useRef} from "react";

type callbackType = (text:string) => Dispatch<any>

export const useDebounce = (callback:callbackType, delay:number) => {
    let timer = useRef(null);

    return useCallback((value) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        (timer.current as any) = setTimeout(() => {

            callback(value)
        }, delay)
    }, [callback, delay])

}
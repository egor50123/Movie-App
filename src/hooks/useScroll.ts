import {useEffect, useRef} from "react";

export const useScroll = (childRef:any,callback: () => void,isLoading:boolean,isEnd:boolean) => {
    const observer:any = useRef()
    useEffect(() => {
        if (!childRef.current || isEnd) return

        const child = childRef.current
        if (isLoading || isEnd) {
            return () => {
                observer.current.unobserve(child)
            }
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                callback()
            }
        }, options)
        observer.current.observe(childRef.current)

        return () => {
            observer.current.unobserve(child)
        }
    },[isLoading,isEnd])

    return true
}
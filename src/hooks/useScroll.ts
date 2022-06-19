import {useEffect, useRef} from "react";

export const useScroll = (childRef:any,callback: () => void,isLoading:boolean) => {
    const observer:any = useRef()
    useEffect(() => {
        const child = childRef.current
        if (isLoading) {
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
                console.log("fetch from scroll")
            }
        }, options)

        observer.current.observe(childRef.current)

        return () => {
            observer.current.unobserve(child)
        }
    },[isLoading])

    return true
}
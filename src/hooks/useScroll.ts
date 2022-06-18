import {useEffect, useRef} from "react";

export const useScroll = (childRef:any,callback: () => void) => {
    const observer:any = useRef()
    useEffect(() => {
        console.log("scroll")
        const child = childRef.current
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
    },[callback])

    return true
}
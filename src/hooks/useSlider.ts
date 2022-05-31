import React, {useRef, useState} from "react";

export const useSlider = () => {
    let startXRef = useRef(0)
    let translateX = useRef(0)
    let currentRef = useRef(0)
    let widthRef = useRef(0)
    let [isDrag,setDrag] = useState(false)
    let [diffX,setDiffx] = useState(0)
    let [dragDisable, setDragDisable] = useState(false)
    let [transitionClass,setTransition] = useState("")
    const TIMEOUT_DELAY = 500

    const setTranslateStyle = (target:Element,x:number) => target.setAttribute("style", `transform: translateX(${x}px)`)
    const setTranslateValue = (side:number = 0) => translateX.current = -widthRef.current * (currentRef.current + side)

    function swipeStart (e:React.MouseEvent<HTMLDivElement>) {
        if (!dragDisable) {
            let target = (e.target as HTMLElement).closest(".poster__slider")
            if (target) {
                widthRef.current = target.getBoundingClientRect().width
                let targetItem = (e.target as HTMLElement).closest(".poster__item")
                let id = targetItem && +targetItem.id.replace(/[a-z]/gi,"");
                if (id != null) {
                    currentRef.current = id
                }
                startXRef.current = e.pageX
                setDrag(true)
            }
        }
    }

    function  swipeMove (e:React.MouseEvent<HTMLDivElement>){
        if (isDrag && !dragDisable) {
            let target = (e.target as HTMLElement).closest(".poster__slider")
            let moveX = e.pageX
            let diff = moveX - startXRef.current
            if (!target) return
            if (currentRef.current === 0) {
                if (diff <= 200) {
                    setTranslateStyle(target,translateX.current + diff)
                    setDiffx(diff)
                }
            } else if (currentRef.current === 2) {
                if (diff >= -200) {
                    setTranslateStyle(target,translateX.current + diff)
                    setDiffx(diff)
                }
            } else {
                setTranslateStyle(target,translateX.current + diff)
                setDiffx(diff)
            }
        }
    }

    function swipeEnd(e:React.MouseEvent<HTMLDivElement>) {
        if (isDrag && !dragDisable) {
            setTransition("poster__slider--touchEnd")
            let target = (e.target as HTMLDivElement).closest(".poster__slider")
            setDrag(false)
            if (target && Math.abs(diffX/widthRef.current) >= 0.35) {
                if (diffX < 0) {
                    if (currentRef.current === 2) {
                        setTranslateStyle(target,-widthRef.current * currentRef.current)
                    } else {
                        setTranslateStyle(target,-widthRef.current * (currentRef.current + 1))
                        setTranslateValue(1)
                    }
                } else {
                    if (currentRef.current === 0) {
                        setTranslateStyle(target,-widthRef.current * currentRef.current)
                    } else {
                        setTranslateStyle(target,-widthRef.current * (currentRef.current -1))
                        setTranslateValue(-1)
                    }
                }
            } else if (target) {
                setTranslateStyle(target,-widthRef.current * currentRef.current)
                setTranslateValue(0)
            }
            setDragDisable(true)
            setTimeout(() => {
                setTransition("");
                setDragDisable(false)
            },TIMEOUT_DELAY)
            setDiffx(0)
        }
    }

    return {swipeStart,swipeMove,swipeEnd,transitionClass}
}
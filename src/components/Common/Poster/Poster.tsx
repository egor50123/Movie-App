import React, {useEffect, useRef, useState} from 'react';
import "./Poster.scss"
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {BASE_IMG_URL, BIG_IMG_URL} from "../../../API/indexAPI";


const Poster = () => {
    const {fetchPosterItems} = useAction()
    const payload:any[] = useTypedSelector(state => state.poster.payload)
    let posterArr = null
    let startXRef = useRef(0)
    let translateX = useRef(0)
    let currentRef = useRef(0)
    let widthRef = useRef(0)
    let [isDrag,setDrag] = useState(false)
    let [diffX,setDiffx] = useState(0)
    let [dragDisable, setDragDisable] = useState(false)
    let [transitionClass,setTransition] = useState("")
    const TIMEOUT_DELAY = 500

    if (payload.length > 0) {
        posterArr = payload.slice(0,3)
    }

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

    useEffect(() => {
        fetchPosterItems()
    },[])


    return (
        <div className={"poster"}>
            <div className={`poster__slider ${transitionClass}`} onMouseDown={swipeStart} onMouseMove={swipeMove} onMouseUp={swipeEnd} onMouseLeave={swipeEnd}>
                {posterArr && posterArr.map((item,index) =>
                    <div className={"poster__item"} key={`poster${item.id}`} id={`poster${index}`}>
                        <img className={"poster__bg"} draggable={false} src={`${BIG_IMG_URL}${item.backdrop_path}`} alt=""/>
                        <div className={"poster_item-container"}>
                            <div className={"poster__box"}>
                                <div className={"poster__info"}>
                                    <h2>{item.title}</h2>
                                    <p>{item.overview}</p>
                                    <div className={"poster__btn-box"}>
                                        <button className={"poster_btn"}>Подробнее</button>
                                        <button className={"poster_btn"}>Смотреть трейлер</button>
                                    </div>
                                </div>

                            </div>
                            <div className={"poster__box"}>
                                <div className={"poster__img"}>
                                    <img draggable={false} src={`${BASE_IMG_URL}${item.poster_path}`} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Poster;
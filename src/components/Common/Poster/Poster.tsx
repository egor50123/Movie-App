import React, {useEffect} from 'react';
import "./Poster.scss"
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {BASE_IMG_URL, BIG_IMG_URL} from "../../../API/indexAPI";
import {useSlider} from "../../../hooks/useSlider";


const Poster = () => {
    const {fetchPosterItems} = useAction()
    const {swipeStart,swipeMove,swipeEnd,transitionClass} = useSlider()
    const payload:any[] = useTypedSelector(state => state.poster.payload)
    let posterArr = null

    if (payload.length > 0) {
        posterArr = payload.slice(0,3)
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
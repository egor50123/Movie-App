import React, {FC, useEffect} from 'react';
import "./PreviewItem.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {NavLink} from "react-router-dom";
import Switch from "../../../components/Common/Switch/Switch";
import {Types} from "../MainPage";
import {shallowEqual} from "react-redux";

interface IPreviewItem {
    title:string,
    type:Types
}

interface ISwitch {
    movies: {
        [key: number]: "now_playing" | "popular" | "upcoming" | "top_rated"
    },
    tv: {
        [key: number]: "popular" | "airing_today" | "on_the_air" | "top_rated"
    }
}

const PreviewItem:FC<IPreviewItem> = ({title,type}) => {
    const {Tv:switchTvType,Movies:switchMoviesType} = useTypedSelector(state => state.mainPage.switchType,shallowEqual)
    let previews = useTypedSelector(state => state.previewItem.previews)

    const obj:ISwitch = {
        movies: {
            1:"now_playing",
            2:"popular",
            3:"upcoming",
            4:"top_rated"
        },
        tv: {
            1:"popular",
            2:"airing_today",
            3:"on_the_air",
            4:"top_rated"
        }
    }


    const {fetchPreviewItems} = useAction()

    useEffect( () => {
        switch (type) {
            case Types.Movies: fetchPreviewItems(type,obj.movies[switchMoviesType]);break;
            case Types.Tv:fetchPreviewItems(type,obj.tv[switchTvType]);break;
            default: break;
        }
    },[switchTvType,switchMoviesType])

    if (previews.error) {
        return <h1>error</h1>
    }

    return (
        <div className={"previewItem"}>
            <div>
                <h2>{title}</h2>
                <Switch type={type}/>
            </div>
            {<div className={"previewItem__list"}>
                    {(previews[type] !== undefined && !previews[type].isLoading) ? previews[type].payload.map(film =>
                        <div className={"previewItem__item"} key={film.id} id={film.id}>
                            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`} alt=""/>
                            {film.title}<br/>
                            <NavLink to={`/movie/${film.id}`}>перейти</NavLink>
                        </div>
                    ) : <h1>Loading</h1>}
            </div>}
        </div>
    );
};

export default PreviewItem;
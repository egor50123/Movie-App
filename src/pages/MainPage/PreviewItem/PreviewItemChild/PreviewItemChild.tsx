import React, {FC, useEffect} from 'react';
import Switch from "../../../../components/Common/Switch/Switch";
import {NavLink} from "react-router-dom";
import {Types} from "../../MainPage";
import {useAction} from "../../../../hooks/useAction";

interface IPreviewItemPure {
    title:string,
    type: Types,
    switchType:number,
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: any[],
        },
    }
}

interface ISwitch {
    movies: {
        [key: number]: "now_playing" | "popular" | "upcoming" | "top_rated"
    },
    tv: {
        [key: number]: "popular" | "airing_today" | "on_the_air" | "top_rated"
    }
}
//++

const PreviewItemChild:FC<IPreviewItemPure> = ({title,type,previews,switchType}) => {

    const {fetchPreviewItems} = useAction()

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

    useEffect( () => {
        switch (type) {
            case Types.Movies: fetchPreviewItems(type,obj.movies[switchType]);break;
            case Types.Tv:fetchPreviewItems(type,obj.tv[switchType]);break;
            default: break;
        }
    },[switchType])

    return (
        <>
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
        </>
    );
};

export default PreviewItemChild;
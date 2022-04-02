import React, {useEffect} from 'react';
import "./PreviewItem.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {NavLink} from "react-router-dom";

const PreviewItem = () => {
    const {films,isLoading,error} = useTypedSelector(state => state.user)

    const {fetchPopularFilms} = useAction()


    useEffect( () => {
        fetchPopularFilms()
    },[])

    if (error) {
        return <h1>error</h1>
    }

    return (
        <div className={"previewItem"}>
            {<div className={"previewItem__list"}>
                {!isLoading ? films.map(film =>
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
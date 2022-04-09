import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

type MovieTvItemType = "tv" | "movie"

interface IMovieTvItem {
    [key:string]: MovieTvItemType
}

const MovieTvItem:FC<IMovieTvItem> = ({type}) => {
    let params = useParams()

    let {fetchMovieTvPerson} = useAction()

    let title = useTypedSelector(state => state.movieTvPerson.title)
    let description = useTypedSelector(state => state.movieTvPerson.description)

    let id:string | undefined =  params.movieId


    useEffect(() => {
        if (id !== undefined) {
            fetchMovieTvPerson(id)
        }
        // размонтирование сделать
    },[id])

    return (
        <div>
            {title}
            <div>
                {description}
            </div>
        </div>
    );
};

export default MovieTvItem;
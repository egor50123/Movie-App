import React, {FC, useEffect} from 'react';
import Switch from "../../../../components/Common/Switch/Switch";
import {NavLink} from "react-router-dom";
import {useAction} from "../../../../hooks/useAction";
import {EPreviewItems, ESwitch, ISwitch, PreviewItemsTypes} from "../../../../models/previewItem_SwitchM";

interface IPreviewItemPure {
    title:string,
    type: PreviewItemsTypes,
    switchType:number,
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: any[],
        },
    }
}


const PreviewItemChild:FC<IPreviewItemPure> = ({title,type,previews,switchType}) => {

    const {fetchPreviewItems} = useAction()

    const switchTypes:ISwitch = {
        Movies: {
            1:ESwitch.now_playing,
            2:ESwitch.popular,
            3:ESwitch.upcoming,
            4:ESwitch.top_rated
        },
        Tv: {
            1:ESwitch.popular,
            2:ESwitch.airing_today,
            3:ESwitch.on_the_air,
            4:ESwitch.top_rated
        }
    }

    useEffect( () => {
        switch (type) {
            case EPreviewItems.Movies: fetchPreviewItems(type,switchTypes.Movies[switchType]);break;
            case EPreviewItems.Tv:fetchPreviewItems(type,switchTypes.Tv[switchType]);break;
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
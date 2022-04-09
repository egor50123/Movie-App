import React, {FC, useEffect} from 'react';
import Switch from "../../../../components/Common/Switch/Switch";
import {NavLink} from "react-router-dom";
import {useAction} from "../../../../hooks/useAction";
import {EPreviewItems, PreviewItemsTypes} from "../../../../models/previewItem_SwitchM";
import {BASE_IMG_URL} from "../../../../API/indexAPI";

interface IPreviewItemPure {
    title:string,
    type: PreviewItemsTypes,
    switchType:number,
    switchTitles:string[][],
    previews:{
        [key:string]: {
            isLoading: boolean,
            error: null | string,
            payload: any[],
        },
    }
}




const PreviewItemChild:FC<IPreviewItemPure> = ({title,type,previews,switchType,switchTitles}) => {
    if (type === EPreviewItems.Trailers) {
        debugger
    }
    const {fetchPreviewItems} = useAction()

    useEffect( () => {
        fetchPreviewItems(type,switchTitles[switchType-1][0]);
    },[switchType])

    return (
        <>
            <div>
                <h2>{title}</h2>
                <Switch type={type} switchTitles={switchTitles}/>
            </div>

            {<div className={"previewItem__list"}>
                {(previews[type] !== undefined && !previews[type].isLoading) ? previews[type].payload.map(film =>
                    <div className={"previewItem__item"} key={film.id} id={film.id}>
                        <img src={`${BASE_IMG_URL}${film.poster_path}`} alt=""/>
                        {film.title}<br/>
                        <NavLink to={`/${type === "Tv" ? "tv" : "movie"}/${film.id}`}>перейти</NavLink>
                    </div>
                ) : <h1>Loading</h1>}
            </div>}
        </>
    );
};

export default PreviewItemChild;
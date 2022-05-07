import React, {FC, useEffect} from 'react';
import Switch from "../../../../components/Common/Switch/Switch";
import {NavLink} from "react-router-dom";
import {useAction} from "../../../../hooks/useAction";
import {EPreviewItems, IPreviewItemPure} from "../../../../models/previewItem_SwitchM";
import {BASE_IMG_URL} from "../../../../API/indexAPI";

const PreviewItemChild: FC<IPreviewItemPure> = ({title, type, previews, switchType, switchTitles}) => {
    if (type === EPreviewItems.Trailers) {
        debugger
    }
    const {fetchPreviewItems} = useAction()

    useEffect(() => {
        fetchPreviewItems(type, switchTitles[switchType - 1][0]);
    }, [switchType])


    return (
        <>
            <div>
                <h2>{title}</h2>
                <Switch type={type} switchTitles={switchTitles}/>
            </div>

            {<div className={"previewItem__list"}>
                {(previews[type] !== undefined && !previews[type].isLoading) ? previews[type].payload.map(film =>
                    <NavLink to={`/${film["title"] !== undefined ? "movie" : "tv"}/${film.id} `} key={film.id}>
                        <div className={"previewItem__item"} id={film.id}>
                            <div className={"previewItem__img-box"}>
                                <img src={`${BASE_IMG_URL}${film.poster_path}`} alt=""/>
                            </div>
                            {film["title"] !== undefined ? film["title"] : film["name"]}<br/>

                        </div>
                    </NavLink>
                ) : <div className={"previewItem__plug"}>
                </div>}
            </div>}
        </>
    );
};

export default PreviewItemChild;
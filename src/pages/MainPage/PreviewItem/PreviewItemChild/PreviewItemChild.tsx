import React, {FC, useEffect} from 'react';
import Switch from "../../../../components/Common/Switch/Switch";
import {NavLink} from "react-router-dom";
import {useAction} from "../../../../hooks/useAction";
import {EPreviewItems, IPreviewItemPure} from "../../../../models/previewItem_SwitchM";
import {BASE_IMG_URL} from "../../../../API/indexAPI";
import Card from "../../../../components/Common/Card/Card";
import {IMoviesTvsPayload} from "../../../../models/payloadAPI_M";


const PreviewItemChild: FC<IPreviewItemPure> = ({title, type, previews, switchType, switchTitles}) => {
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
                {(previews[type] !== undefined && !previews[type].isLoading && previews[type].payload) ?
                    (previews[type].payload as IMoviesTvsPayload).results.map(film =>
                        <Card id={film.id}
                              title={film.title || film.name}
                              bg_path={film.poster_path}
                              overview={film.overview} vote={film.vote_average}/>
                ) : <div className={"previewItem__plug"}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>}
            </div>}
        </>
    );
};

export default PreviewItemChild;
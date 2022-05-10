import React, {FC, useEffect} from 'react';
import Switch from "../../../../components/Common/Switch/Switch";
import {useAction} from "../../../../hooks/useAction";
import {IPreviewItemPure} from "../../../../models/previewItem_SwitchM";
import Card from "../../../../components/Common/Card/Card";
import {IMoviesTvsPayload} from "../../../../models/payloadAPI_M";
import {cardTypeAPI, cardTypes} from "../../../../models/cardM";


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
                        <Card key={film.id} id={film.id}
                              title={film.title as string || film.name as string}
                              typeAPI={film.title === undefined ? cardTypeAPI.tv : cardTypeAPI.movie }
                              bg_path={film.poster_path}
                              overview={film.overview}
                              vote={film.vote_average}
                              date={film.release_date as string || film.first_air_date as string}
                              country={film.origin_country}
                              genres={film.genre_ids}
                              type={cardTypes.type_1}/>
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
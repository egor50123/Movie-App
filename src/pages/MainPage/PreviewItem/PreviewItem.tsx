import React, {FC} from 'react';
import "./PreviewItem.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {shallowEqual} from "react-redux";
import PreviewItemChild from "./PreviewItemChild/PreviewItemChild";
import {EPreviewItems, PreviewItemsTypes} from "../../../models/previewItem_SwitchM";

interface IPreviewItem {
    title:string,
    type:PreviewItemsTypes,
}


const PreviewItem:FC<IPreviewItem> = ({title,type}) => {
    const {Tv:switchTvType,Movies:switchMoviesType} = useTypedSelector(state => state.mainPage.switchType,shallowEqual)
    let previews = useTypedSelector(state => state.previewItem.previews)

    let switchType = type === EPreviewItems.Tv ? switchTvType : switchMoviesType


    if (previews.error) {
        return <h1>error</h1>
    }
    return (
        <div className={"previewItem"}>
            <PreviewItemChild title={title} type={type} switchType={switchType} previews={previews}/>
        </div>
    );
};

export default PreviewItem;
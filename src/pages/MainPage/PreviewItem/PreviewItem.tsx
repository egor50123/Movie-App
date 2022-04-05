import React, {FC} from 'react';
import "./PreviewItem.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {Types} from "../MainPage";
import {shallowEqual} from "react-redux";
import PreviewItemChild from "./PreviewItemChild/PreviewItemChild";

interface IPreviewItem {
    title:string,
    type:Types,
}


const PreviewItem:FC<IPreviewItem> = ({title,type}) => {
    const {Tv:switchTvType,Movies:switchMoviesType} = useTypedSelector(state => state.mainPage.switchType,shallowEqual)
    let previews = useTypedSelector(state => state.previewItem.previews)

    let switchType = type === "Tv" ? switchTvType : switchMoviesType


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
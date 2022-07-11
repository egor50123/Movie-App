import React, {FC} from 'react';
import "./PreviewItem.module.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {shallowEqual} from "react-redux";
import PreviewItemChild from "./PreviewItemChild/PreviewItemChild";
import {IPreviewItem} from "../../../models/previewItem_SwitchM";
import styles from "./PreviewItem.module.scss"
import {currentSwitch, previewsPayload} from "../../../store/selectors/mainPageSelectors";

const PreviewItem:FC<IPreviewItem> = ({title,type,switchTitles}) => {
    const switchCurrent = useTypedSelector(currentSwitch,shallowEqual)
    const previews = useTypedSelector(previewsPayload)
    const switchType = switchCurrent[type] !== undefined ? switchCurrent[type] : 1


    if (previews.error) {
        return <h1>error</h1>
    }
    return (
        <div className={styles.previewItem}>
            <PreviewItemChild title={title} type={type} switchType={switchType} previews={previews} switchTitles={switchTitles}/>
        </div>
    );
};

export default PreviewItem;
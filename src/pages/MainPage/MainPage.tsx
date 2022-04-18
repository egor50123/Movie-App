import "./MainPage.scss"
import PreviewItem from "./PreviewItem/PreviewItem";
import {EPreviewItems} from "../../models/previewItem_SwitchM";
import Poster from "../../components/Common/Poster/Poster";
import React from "react";
import {moviesSwitchTitles, trendsSwitchTitles, tvSwitchTitles} from "../../constants/constants";

const MainPage = () => {
    return (
        <div className={"mainPage"}>
            <Poster/>
            <div className={"container"}>
                <div className={"mainPage__list"}>
                    <PreviewItem title={"Фильмы"} type={EPreviewItems.Movies} switchTitles={moviesSwitchTitles}/>
                    <PreviewItem title={"Сериалы"} type={EPreviewItems.Tv} switchTitles={tvSwitchTitles}/>
                    <PreviewItem title={"Тренды"} type={EPreviewItems.Trends} switchTitles={trendsSwitchTitles}/>
                </div>
            </div>


        </div>
    );
};

export default MainPage;
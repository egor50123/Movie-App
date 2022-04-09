import "./MainPage.scss"
import PreviewItem from "./PreviewItem/PreviewItem";
import Search from "../../components/Common/Search/Search";
import {EPreviewItems, ESwitch} from "../../models/previewItem_SwitchM";
import Poster from "../../components/Common/Poster/Poster";
import React from "react";

const MainPage = () => {
    const moviesSwitchTitles = [[ESwitch.now_playing,"Смотрят сейчас"],
        [ESwitch.popular,"Популярное"],
        [ESwitch.upcoming,"Ожидаемые"],
        [ESwitch.top_rated,"Лучшие"]
    ]

    const tvSwitchTitles = [[ESwitch.popular,"Смотрят сейчас"],
        [ESwitch.airing_today,"Популярное"],
        [ESwitch.on_the_air,"Ожидаемые"],
        [ESwitch.top_rated,"Лучшие"]
    ]

    const trendsSwitchTitles = [[ESwitch.day,"Сегодня"],
        [ESwitch.week,"На этой неделе"],
    ]
    return (
        <div className={"mainPage"}>
            <Poster/>
            <div className={"container"}>
                <div className={"mainPage__searchBox"}>
                    <Search/>
                </div>
                <div className={"mainPage__list"}>
                    <PreviewItem title={"Фильмы"} type={EPreviewItems.Movies} switchTitles={moviesSwitchTitles}/>
                    <PreviewItem title={"Сериалы"} type={EPreviewItems.Tv} switchTitles={tvSwitchTitles}/>
                    <PreviewItem title={"Тренды"} type={EPreviewItems.Trends} switchTitles={trendsSwitchTitles}/>
                    {/*<PreviewItem title={"Последние трейлеры"} type={EPreviewItems.Trailers} switchTitles={trailersSwitchType}/>*/}
                </div>
            </div>


        </div>
    );
};

export default MainPage;
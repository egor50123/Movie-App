import "./MainPage.scss"
import PreviewItem from "./PreviewItem/PreviewItem";
import Search from "../../components/Common/Search/Search";
import {EPreviewItems} from "../../models/previewItem_SwitchM";

const MainPage = () => {
    const moviesSwitchTitles = ["Смотрят сейчас","Популярное","Ожидаемые","Лучшие"];
    const tvSwitchTitles = ["Популярное","В эфире","По телевидению","Лучшее"]
    return (
        <div className={"mainPage"}>
            <div className={"mainPage__searchBox"}>
                <Search/>
            </div>
            <div className={"mainPage__list"}>
                <PreviewItem title={"Фильмы"} type={EPreviewItems.Movies} switchTitles={moviesSwitchTitles}/>
                <PreviewItem title={"Сериалы"} type={EPreviewItems.Tv} switchTitles={tvSwitchTitles}/>
            </div>

        </div>
    );
};

export default MainPage;
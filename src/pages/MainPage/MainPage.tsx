import "./MainPage.scss"
import PreviewItem from "./PreviewItem/PreviewItem";
import Search from "../../components/Common/Search/Search";
import {EPreviewItems} from "../../models/previewItem_SwitchM";

const MainPage = () => {
    return (
        <div className={"mainPage"}>
            <div className={"mainPage__searchBox"}>
                <Search/>
            </div>
            <div className={"mainPage__list"}>
                <PreviewItem title={"Фильмы"} type={EPreviewItems.Movies}/>
                <PreviewItem title={"Сериалы"} type={EPreviewItems.Tv}/>
            </div>

        </div>
    );
};

export default MainPage;
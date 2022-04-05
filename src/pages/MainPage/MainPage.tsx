import "./MainPage.scss"
import PreviewItem from "./PreviewItem/PreviewItem";
import Search from "../../components/Common/Search/Search";

export enum Types {
    Movies = "Movies",
    Tv = "Tv",
    Trailers= "Trailers",
    Trends = "Trends",
}
//+

const MainPage = () => {
    return (
        <div className={"mainPage"}>
            <div className={"mainPage__searchBox"}>
                <Search/>
            </div>
            <div className={"mainPage__list"}>
                <PreviewItem title={"Фильмы"} type={Types.Movies}/>
                <PreviewItem title={"Сериалы"} type={Types.Tv}/>
            </div>

        </div>
    );
};

export default MainPage;
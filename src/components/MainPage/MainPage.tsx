import "./MainPage.scss"
import Search from "../Common/Search/Search";
import PreviewItem from "./PreviewItem/PreviewItem";


const MainPage = () => {


    return (
        <div className={"mainPage"}>
            <div className={"mainPage__searchBox"}>
                <Search/>
            </div>
            <div className={"mainPage__list"}>
                <PreviewItem/>
                <PreviewItem/>
            </div>

        </div>
    );
};

export default MainPage;
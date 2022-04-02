import "./MainPage.scss"
import PreviewItem from "./PreviewItem/PreviewItem";
import Search from "../../components/Common/Search/Search";


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
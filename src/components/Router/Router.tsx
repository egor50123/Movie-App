import React from 'react';
import Loading from "../Common/Loading/Loading";
import {Route, Routes} from "react-router-dom";
import SearchPage from "../../pages/SearchPage/SearchPage";
import SearchCurrent from "../../pages/SearchPage/SearchCurrent/SearchCurrent";
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage";
import {MTP} from "../../constants/constants";
import CategoriesCurrent from "../../pages/CategoriesPage/CategoriesCurrent/CategoriesCurrent";
import AuthPage from "../../pages/AuthPage/AuthPage";
import MainPage from "../../pages/MainPage/MainPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import MyLists from "../../pages/ProfilePage/MyLists/MyLists";
import ListsWrapper from "../../pages/ProfilePage/ListsWrapper/ListsWrapper";
const MovieTvItem = React.lazy(() => import("../Common/MovieTvItem/MovieTvItem"));

const Router = () => {
    return (
        <React.Suspense fallback={<Loading/>}>
            <Routes>
                <Route path={"/search"} element={<SearchPage/>}>
                    <Route index element={<SearchCurrent type={"movie"}/>}/>
                    <Route path={":searchCurrent"} element={<SearchCurrent type={"tv"}/>}/>
                </Route>

                <Route path={"/movie"} element={<CategoriesPage type={MTP.movie}/>}>
                    <Route index element={<CategoriesCurrent type={MTP.movie}/>}/>
                    <Route path={":movieId"} element={<MovieTvItem type={MTP.movie}/>}/>
                    <Route path={"genres/:genresId"}
                           element={<CategoriesCurrent type={MTP.movie}/>}/>
                </Route>

                <Route path={"/tv"} element={<CategoriesPage type={MTP.tv}/>}>
                    <Route index element={<CategoriesCurrent type={MTP.tv}/>}/>
                    <Route path={":tvId"} element={<MovieTvItem type={MTP.tv}/>}/>
                    <Route path={"genres/:genresId"}
                           element={<CategoriesCurrent type={MTP.tv}/>}/>
                </Route>

                <Route path={"/auth"} element={<AuthPage/>}/>
                <Route path={"*"} element={<MainPage/>}/>
                <Route path={"/profile"} element={<ProfilePage/>}>
                    <Route index element={<MyLists/>}/>
                    <Route path={`:currentList`} element={<ListsWrapper/>}/>
                </Route>
            </Routes>
        </React.Suspense>
    );
};

export default Router;
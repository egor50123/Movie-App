import React, {useEffect, useRef} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import CategoriesCurrent from "./pages/CategoriesPage/CategoriesCurrent/CategoriesCurrent";
import SearchPage from "./pages/SearchPage/SearchPage";
import SearchCurrent from "./pages/SearchPage/SearchCurrent/SearchCurrent";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import MovieTvItem from "./pages/CategoriesPage/MovieTvItem/MovieTvItem";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {MainPageState} from "./store/types/mainPageT";
import {useAction} from "./hooks/useAction";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
    let genres = useTypedSelector(state => (state.mainPage as MainPageState).genres.payload)
    let token  = useTypedSelector(state => state.auth.payload?.request_token)
    let wasTokenDeleted = useRef(false)
    let {fetchAuthToken,setAuthTokenLocal} = useAction()

    useEffect(() => {
        let tokenStorage = localStorage.getItem("movieAppToken")
        if (tokenStorage) {
            setAuthTokenLocal(tokenStorage)
            wasTokenDeleted.current = true
            localStorage.removeItem("movieAppToken")
        } else if (typeof tokenStorage !== "string" && typeof token !== "string") {
            wasTokenDeleted.current = false
            fetchAuthToken()
        } else if( typeof token === "string" && !wasTokenDeleted.current) {
            localStorage.setItem(`movieAppToken`,token)
        }

    },[token])

    return (
        <div className={"app"}>
            <Header/>
            <div className={"main"}>
                <Routes>
                    <Route path={"/search"} element={<SearchPage/>}>
                        <Route index element={<SearchCurrent type={"movie"}/>}/>
                        <Route path={"tv"} element={<SearchCurrent type={"tv"}/>}/>
                    </Route>

                    <Route path={"/movie"} element={<CategoriesPage type={"movie"}/>}>
                        <Route index element={<CategoriesCurrent type={"movie"}/>}/>
                        <Route path={":movieId"} element={<MovieTvItem type={"movie"}/>}/>
                        {genres?.map(item =>
                            <Route key={item.id} path={"genres/:genresId"}
                                   element={<CategoriesCurrent type={"movie"}/>}/>)}
                    </Route>

                    <Route path={"/tv"} element={<CategoriesPage type={"tv"}/>}>
                        <Route index element={<CategoriesCurrent type={"tv"}/>}/>
                        <Route path={":tvId"} element={<MovieTvItem type={"tv"}/>}/>
                    </Route>

                    <Route path={"/auth"} element={<AuthPage/>}/>
                    <Route path={"*"} element={<MainPage/>}/>
                    <Route path={"/profile"} element={<ProfilePage/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;

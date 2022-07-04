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
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useAction} from "./hooks/useAction";
import MyLists from "./pages/ProfilePage/MyLists/MyLists";
import ListsWrapper from "./pages/ProfilePage/ListsWrapper/ListsWrapper";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {MTP} from "./constants/constants";
import Snackbar from "./components/Common/Snackbar/Snackbar";
import Loading from "./components/Common/Loading/Loading";

const MovieTvItem = React.lazy(() => import('./pages/CategoriesPage/MovieTvItem/MovieTvItem'));

function App() {
    let token  = useTypedSelector(state => state.auth.payload?.request_token)
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let wasTokenDeleted = useRef(false)
    let {fetchAuthToken,setAuthTokenLocal,fetchAccount} = useAction()

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

    useEffect(() => {
        if (typeof sessionId === "string") {
            fetchAccount(sessionId)
        }
    },[sessionId])

    return (
        <div className={"app"}>
            <Header/>
            <div className={"main"}>
                <React.Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path={"/search"} element={<SearchPage/>}>
                            <Route index element={<SearchCurrent type={"movie"}/>}/>
                            <Route path={":searchCurrent"} element={<SearchCurrent type={"tv"}/>}/>
                        </Route>

                        <Route path={"/movie"} element={<CategoriesPage type={MTP.movie}/>}>
                            <Route index element={<CategoriesCurrent type={MTP.movie}/>}/>
                            <Route path={":movieId"} element={<MovieTvItem type={MTP.movie}/>}/>
                            {/*<Route path={":movieId"} element={<React.Suspense fallback={<Loading/>}>*/}
                            {/*    <MovieTvItem type={MTP.movie}/>*/}
                            {/*</React.Suspense>}/>*/}
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

                <Snackbar/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;

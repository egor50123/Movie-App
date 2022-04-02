import React from 'react';
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

function App() {
  return (
    <div>
        <Header/>
        <Routes>
            <Route path={"/search"} element={<SearchPage/>}>
                <Route index element={<SearchCurrent type={"movie"}/>}/>
                <Route path={"tv"} element={<SearchCurrent type={"tv"}/>}/>
            </Route>
            <Route path={"/movie"} element={<CategoriesPage type={"movie"} current={"popular"}/>}>
                <Route path={":movieId"} element={<MovieTvItem/>}/>
                <Route index element={<CategoriesCurrent type={"movie"} current={"popular"}/>}/>
                <Route path={"best"} element={<CategoriesCurrent type={"movie"} current={"best"}/>}/>
            </Route>
            <Route path={"/tv"} element={<CategoriesPage type={"tv"} current={"popular"}/>}>
                <Route path={":tvID"} element={<MovieTvItem/>}/>
                <Route index element={<CategoriesCurrent type={"tv"} current={"popular"}/>}/>
                <Route path={"best"} element={<CategoriesCurrent type={"tv"} current={"best"}/>}/>
            </Route>
            <Route path={"/auth"} element={<AuthPage/>}/>
            <Route path={"*"} element={<MainPage/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;

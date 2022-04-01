import React from 'react';
import './App.css';
import MainPage from "./components/MainPage/MainPage";
import {Route,Routes} from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";

function App() {
  return (
    <div>
        <Header/>
        <Routes>
            <Route path={"/search"} element={<SearchPage/>}/>
            <Route path={"*"} element={<MainPage/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;

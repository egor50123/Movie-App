import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import Snackbar from "./components/Common/Snackbar/Snackbar";
import useAuth from "./hooks/useAuth";
import Router from "./components/Router/Router";
import {genreTypes} from "./store/types/mainPageT";
import {useAction} from "./hooks/useAction";

function App() {
    const {fetchGenres} = useAction()
    useAuth()
    useEffect(() => {
        fetchGenres(genreTypes.genresTv)
        fetchGenres(genreTypes.genresMovie)
    }, [])

    return (
        <div className={"app"}>
            <Header/>
            <div className={"main"}>
                <Router/>
                <Snackbar/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;

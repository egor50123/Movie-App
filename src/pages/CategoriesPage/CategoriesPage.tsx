import React, {FC} from 'react';
import "./CategoriesPage.scss"
import {Outlet} from "react-router-dom";

interface ICategoriesPage {
    type: "movie" | "tv"
    current: "popular" | "best"
}

const CategoriesPage:FC<ICategoriesPage> = ({type,current="popular"}) => {


    return (
        <div className={"categoriesPage container"}>
            <Outlet/>
        </div>
    );
};

export default CategoriesPage;
import React, {FC} from 'react';
import "./CategoriesPage.scss"
import {Outlet} from "react-router-dom";
import {ICategoriesPage} from "../../models/categoriesM";
import CategoriesFilter from "./CategoriesFilter/CategoriesFilter";

const CategoriesPage:FC<ICategoriesPage> = ({type}) => {

    return (
        <div className={"categoriesPage container"}>
            <div className={"categoriesPage_col"}>
                <div className={"categoriesPage__filter filter"}>
                    <CategoriesFilter type={type}/>
                </div>
                <Outlet/>
            </div>

        </div>
    );
};

export default CategoriesPage;
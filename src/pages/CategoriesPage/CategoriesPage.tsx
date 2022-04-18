import React, {FC} from 'react';
import "./CategoriesPage.scss"
import {Outlet} from "react-router-dom";
import {ICategoriesPage} from "../../models/categoriesM";

const CategoriesPage:FC<ICategoriesPage> = ({type}) => {

    return (
        <div className={"categoriesPage container"}>
            <Outlet />
        </div>
    );
};

export default CategoriesPage;
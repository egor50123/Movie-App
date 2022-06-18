import React, {FC} from 'react';
import "./categoriesPage.module.scss"
import {Outlet} from "react-router-dom";
import {ICategoriesPage} from "../../models/categoriesM";
import s from "./categoriesPage.module.scss"

const CategoriesPage: FC<ICategoriesPage> = ({type}) => {

    return (
        <div className={s.categoriesPage}>
            <Outlet/>
        </div>
    );
};

export default CategoriesPage;
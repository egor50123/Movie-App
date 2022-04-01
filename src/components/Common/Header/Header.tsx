import React from 'react';
import "./Header.scss"
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={"header"}>
            <NavLink to={""}>home</NavLink>
        </div>
    );
};

export default Header;
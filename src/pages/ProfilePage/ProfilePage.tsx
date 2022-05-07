import React from 'react';
import "./ProfilePage.scss"
import {Link, Outlet} from "react-router-dom";
import {ProfileLinksNames} from "../../models/ProfileM";


const ProfilePage = () => {
    return (
        <div className={"profile"}>
            <div className={"profile__menu"}>
                <Link to={``}>Списки</Link>
                <Link to={`${ProfileLinksNames.watchlist}`}>Список отслеживания</Link>
                <Link to={`${ProfileLinksNames.ratings}`}>Рейтинги</Link>
                <Link to={`${ProfileLinksNames.favorites}`}>Избранное</Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default ProfilePage;
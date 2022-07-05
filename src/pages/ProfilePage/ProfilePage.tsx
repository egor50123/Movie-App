import React from 'react';
import s from "./profilePage.module.scss"
import {Link, Outlet} from "react-router-dom";
import {ProfileLinksNames} from "../../models/ProfileM";
import bg from "../../assest/image/bgred2.jpg"


const ProfilePage = () => {
    return (
        <div className={s.profile}>
            <div className={s.header}>
                <div className={s.headerInfo}>
                    <img className={s.bgImage} src={bg} alt=""/>
                </div>

            </div>
            <div className={s.profile__menu}>
                <div className={s.menuBox}>
                    <Link className={s.link} to={``}>Списки</Link>
                    <Link className={s.link} to={`${ProfileLinksNames.watchlist}`}>Список отслеживания</Link>
                    <Link className={s.link} to={`${ProfileLinksNames.ratings}`}>Рейтинги</Link>
                    <Link className={s.link} to={`${ProfileLinksNames.favorites}`}>Избранное</Link>
                </div>

            </div>
            <Outlet/>
        </div>
    );
};

export default ProfilePage;
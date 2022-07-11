import React, {useCallback, useState} from 'react';
import "./header.module.scss"
import {Link} from "react-router-dom";
import logo from "../../../assest/image/logo.svg"
import Search from "../Search/Search";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import CategoriesList from "./CategoriesList/CategoriesList";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import * as authSelectors from "../../../store/selectors/authSelecors";
import s from "./header.module.scss"
import {Tooltip} from "@mui/material";
import {ProfileLinksNames} from "../../../models/ProfileM";

const Header = () => {
    const isAuth = useTypedSelector(authSelectors.isAuth)
    const token = useTypedSelector(authSelectors.token)
    const session = useTypedSelector(authSelectors.session)
    const [isProfileOpen, setProfileOpen] = useState(false)

    const {deleteSession} = useAction()

    const onLogOut = useCallback(() => {
        if (session) deleteSession(session)
    },[session])

    const onAuth = () => {
        localStorage.setItem("movieAppTokenActivate","true")
    }

    const onAuthTry = () => {
        localStorage.removeItem("movieAppToken")
    }

    const menuOpen = useCallback(() => setProfileOpen(prev => !prev),[])

    return (
        <div className={s.header}>
            <div className={s.header__left}>
                <Link className={s.header__logo} to={""}><img src={logo} alt="" width={180} height={50}/></Link>

                <div className={s.header__categories}>
                    <CategoriesList/>
                </div>
            </div>
            <div className={s.header__right}>
                <div className={s.header__search}>
                    <Search/>
                </div>
                {!isAuth ?
                    <div>
                        <Tooltip title={"Войти"} placement={"bottom"}>
                            <a rel="noreferrer"
                               href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/auth`}
                               className={s.userLink}
                               onClick={onAuth}
                               target="_blank"><PersonOutlineIcon color={"inherit"}/></a>
                        </Tooltip>

                    </div>

                    :
                    <div className={s.header__profile}>
                        <h2 className={s.profileName}>Garrus</h2>
                        <div onClick={menuOpen} className={s.profile}>
                            <FaceTwoToneIcon color={"inherit"}/>
                            {isProfileOpen && <ul className={s.profileMenu}>
                                <li className={s.profileMenu__item}>
                                    <Link className={s.profileLinks} to={"/profile"}>Профиль</Link>
                                    <Link className={s.profileLinks} to={`/profile/${ProfileLinksNames.lists}`}>Списки</Link>
                                    <Link className={s.profileLinks} to={`/profile/${ProfileLinksNames.favorites}`}>Избранное</Link>
                                    <Link className={s.profileLinks} to={`/profile/${ProfileLinksNames.watchlist}`}>Закладки</Link>
                                  <Link className={s.profileLinks} to={`/profile/${ProfileLinksNames.ratings}`}>Рейтинги</Link>
                                </li>
                                <li className={s.profileMenu__item}>
                                    <button className={s.logout} onClick={onLogOut}>Выйти</button>
                                </li>
                            </ul>}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;
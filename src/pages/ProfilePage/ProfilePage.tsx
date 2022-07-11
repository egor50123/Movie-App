import React, {useEffect, useState} from 'react';
import s from "./profilePage.module.scss"
import {Link, Outlet, useParams} from "react-router-dom";
import {ProfileLinksNames} from "../../models/ProfileM";
import bg from "../../assest/image/bgred2.jpg"
import {setMenuActiveItem} from "../../helpers/setMenuActiveItem";
import {getInitActiveProfile} from "../../helpers/getInitActiveProfile";


const ProfilePage = () => {
    const params = useParams()
    const [currentActiveId,setActive] = useState(getInitActiveProfile(params.currentList))

    useEffect(() => {
        setActive(getInitActiveProfile(params.currentList))
    },[params.currentList])

    const onClick = (e:React.MouseEvent) => {
        let id = (e.target as HTMLDivElement).closest("a")?.id
        if (id) {
            setActive(Number(id))
        }
    }

    const setClassName = (id:number) => {
        return  setMenuActiveItem({
            id:id,
            currentActiveId: currentActiveId,
            classname: s.link,
            classnameActive: s.link__active
        })
    }

    return (
        <div className={s.profile}>
            <div className={s.header}>
                <div className={s.headerInfo}>
                    <img className={s.bgImage} src={bg} alt=""/>
                </div>

            </div>
            <div className={s.profile__menu}>
                <div className={s.menuBox} onClick={onClick}>
                    <Link id={"1"} className={setClassName(1)} to={``}>Списки</Link>
                    <Link id={"2"} className={setClassName(2)} to={`${ProfileLinksNames.watchlist}`}>Закладки</Link>
                    <Link id={"3"} className={setClassName(3)} to={`${ProfileLinksNames.ratings}`}>Рейтинги</Link>
                    <Link id={"4"} className={setClassName(4)} to={`${ProfileLinksNames.favorites}`}>Избранное</Link>
                </div>

            </div>
            <Outlet/>
        </div>
    );
};

export default ProfilePage;
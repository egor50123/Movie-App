import React from 'react';
import Card from "../../../components/Common/Card/Card";
import ListItem from "./ListItem/ListItem";
import s from "./myLists.module.scss"

const MyLists = () => {
    return (
        <div className={s.root}>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
        </div>
    );
};

export default MyLists;
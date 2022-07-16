import React from 'react';
import s from "./loading.module.scss"
import {CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <div className={s.root}>
            <CircularProgress />
        </div>
    );
};

export default Loading;
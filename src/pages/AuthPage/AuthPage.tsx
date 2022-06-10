import React, {useEffect, useLayoutEffect} from 'react';
import "./AuthPage.scss"
import {useAction} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import * as authSelectors from "../../store/selectors/authSelecors"


const AuthPage = () => {
    let token = useTypedSelector(authSelectors.token)
    let sessionSuccess = useTypedSelector(authSelectors.isAuth)

    let {createSession} = useAction()
    let navigate = useNavigate()

    useLayoutEffect(() => {
        if (typeof token === "string") createSession(token)
    },[token])

    useEffect(() => {
        if (sessionSuccess) {navigate('/')}
    },[sessionSuccess])

    return (
        <div className={"authPage"}/>
    );
};

export default AuthPage;
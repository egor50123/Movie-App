import React, {useEffect, useLayoutEffect} from 'react';
import "./AuthPage.scss"
import {useAction} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    let token = useTypedSelector(state => state.auth.payload?.request_token)
    let sessionSuccess = useTypedSelector(state => state.auth.session.payload?.success)

    let {createSession} = useAction()
    let navigate = useNavigate()

    useLayoutEffect(() => {
        if (typeof token === "string") createSession(token)
    },[token])

    useEffect(() => {
        if (sessionSuccess) navigate('/')
    },[sessionSuccess])


    return (
        <div className={"authPage"}/>
    );
};

export default AuthPage;